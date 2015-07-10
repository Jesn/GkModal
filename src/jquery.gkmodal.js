/*
 *封装dialog插件,基于Bootstrap模态窗口的扩展
 *作者：  Darren
 *email：794382693@qq.com
 */

;(function ($, window, document, undefined) {
    //插件名称
    var pluginName = "gkmodal",
        defaults = {
            id: "modal",//弹窗id
            title: "dialog",//弹窗标题
            content: "",//内容,支持html
            okText: "确认",
            cancelText: "取消",
            //loddingText: "正在加载...",
            buttons: [
                {
                    text: "确定",
                    iconCls: "icon-ok",
                    classes: 'btn btn-primary',
                    handler: function () {
                    }
                }, {
                    text: "取消",
                    iconCls: "icon-cancel",
                    classes: "btn btn-default",
                    handler: function () {
                    }
                }],

            width: "600",//弹窗宽度
            height: "500",//弹窗高度
            autoShow: false,//是否自动显示,默认为false
            backrop: true,//是否显示遮罩层,默认为true,和原生Bootstrap模态框一样
            keyboard: true,//是否开启ESC键退出,默认为true,和原生Bootstrap模态框一样
            remote: "",//加载远程url,和原生Bootstrap模态框一样
            param: "",//接收额外参数,eg: {name1:value1,name2:value2}
        };

    //初始化一个弹出层实例
    function GkModal(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this.name = pluginName;
        this.version = 'v 1.0.0';
        //初始化
        this.init();
    }

    GkModal.prototype = {
        init: function () {
            var _self = this;

            //Dialog 按钮组
            var opts = '';
            if (this.settings.buttons.length>0) {
                opts += '<div class="modal-footer">';
                for (var i = 0; i < this.settings.buttons.length; i++) {
                    var id = "btn-" + this.name + "-" + i;
                    opts += '<button  id=' + id + ' type="button" class="' + this.settings.buttons[i].classes + '">' + this.settings.buttons[i].text + '</button>';
                }
                opts += '</div>';
            }

            //弹出层html代码
            var modalHtml = '<div class="modal fade" id=' + this.settings.id + ' tabindex="-1" role="dialog" aria-labelledby="' + this.settings.id + '-ModalLabel"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" id="' + this.settings.id + '-ModalLabel">' + this.settings.title + '</h4></div><div class="modal-body">' + this.settings.content + '</div> ' + opts + '</div></div></div>';

            //把弹出层代码加入到页面body中
            var mid=this.name+"-modal"
            var modalContent = "<div id=" + mid + ">" + modalHtml + "</div>";
            if ($("#" + mid))
            {
                $("#" + mid).remove();
            }
            $("body").append(modalContent);

            //绑定事件,必须在弹出层加入到页面之后才能生效
            for (var i = 0; i < this.settings.buttons.length; i++) {
                var p = this.settings.buttons[i];
                if (p.handler) {
                    var btn_id = "btn-" + this.name + "-" + i;
                    $("#" + this.settings.id).find("button[id='" + btn_id + "']").bind('click', p.handler);
                }
            }

            //获取弹出层对象
            var modal = $("#" + this.settings.id);
            //初始化弹出层设置
            modal.modal(this.settings);
        }
    };

    $.fn[pluginName] = function (options) {
        this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                //自动弹出 弹出层
                if (options.autoShow) {
                    $.data(this, "plugin_" + pluginName, new GkModal(this, options));
                } else {//点击弹出 弹出层
                    $(this).click(function () {
                        $.data(this, "plugin_" + pluginName, new GkModal(this, options));
                    });
                }
            }
        });
        return this;
    };
})(jQuery, window, document);