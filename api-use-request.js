/**
 * npm の request モジュールを使用してwikiのページを取得し jQuery で操作できるまでのサンプル
 *
 * $npm install request
 * $npm install jsdom
 *   参考URL: http://d.hatena.ne.jp/eureka_tech/20110710/1310257578
              http://kamip.jp/dev/node-jsjquery%E3%81%A7xml%E3%83%91%E3%83%BC%E3%82%B9%E3%81%99%E3%82%8B%E3%81%A8%E3%80%81%E3%81%A8%E3%81%A3%E3%81%A6%E3%82%82%E6%A5%BD%E3%83%81%E3%83%B3%E3%81%AA%E4%BB%B6/
 */

var request = require('request'),
    jsdom   = require('jsdom');

fetch = function(url, headers, next_func){
    //request({uri: url}, function(error, response, body){//user-agent未設定の場合 -> error
    request({uri: url, headers: headers}, function(error, response, body){
        jsdom.env(
            {
                html: body,
                scripts: ['http://code.jquery.com/jquery-1.5.min.js']
            }, function (err, window) {
                //console.log(body);
                //next_func(window.jQuery, body);
                next_func(window, body);
            }
        );
    });
};

var url     = 'http://ja.wikipedia.org/wiki/%E7%89%B9%E5%88%A5:%E3%81%8A%E3%81%BE%E3%81%8B%E3%81%9B%E8%A1%A8%E7%A4%BA';
var headers = {'user-agent' : 'Mozilla/4.7 [ja]C-{C-UDP; EBM-SONY2}'}

//fetch(url, headers, function($, body){
fetch(url, headers, function(window, body){
    //console.log($('html')[0];
    //console.log(window);
    //console.log(body);
    //console.log(window.document.getElementsByTagName('html'));
    $ = window.jQuery;
    console.log($("html").html());
});

/**
 * user-agentを指定しないと wikipedia のページ取得時には以下のエラーが出ます(wikipediaサーバー側の問題)
 *  - Scripts should use an informative User-Agent string with contact information, or they may be IP-blocked without notice. 
 * httpstatus302でも正常にリダイレクト先のページを取得出来る(・∀・)
 */
