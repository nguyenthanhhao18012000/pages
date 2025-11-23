(function () {
    tinymce.create('tinymce.plugins.badge_tag_button', {
        init: function (ed, url) {
            ed.addButton('badge_tag_button', {
                title: 'Tạo badge',
                icon: 'suggestededits-badge',
                onclick: function () {

                    ed.windowManager.open({
                        title: 'Tạo Badge',
                        body: [

                            {
                                type: 'textbox',
                                name: 'text',
                                label: 'Nội dung badge',
                                value: 'New'
                            },

                            // Màu chữ
                            {
                                type: 'container',
                                label: 'Màu chữ',
                                layout: 'flex',
                                direction: 'row',
                                spacing: 5,
                                items: [
                                    {
                                        type: 'colorpicker',
                                        name: 'color_picker',
                                        value: '#ffffff'
                                    },
                                    {
                                        type: 'textbox',
                                        name: 'color',
                                        value: '#ffffff'
                                    }
                                ]
                            },

                            // Màu nền
                            {
                                type: 'container',
                                label: 'Màu nền',
                                layout: 'flex',
                                direction: 'row',
                                spacing: 5,
                                items: [
                                    {
                                        type: 'colorpicker',
                                        name: 'bg_picker',
                                        value: '#1b76cd'
                                    },
                                    {
                                        type: 'textbox',
                                        name: 'bg',
                                        value: '#1b76cd'
                                    }
                                ]
                            }
                        ],

                        /**
                         * Sau khi popup render → gắn sự kiện đồng bộ
                         */
                        onPostRender: function () {
                            var win = this;

                            // Đồng bộ Màu chữ
                            var colorPicker = win.find('#color_picker')[0];
                            var colorInput = win.find('#color')[0];

                            colorPicker.on('change', function () {
                                var val = colorPicker.value();
                                colorInput.value(val);
                            });

                            colorInput.on('keyup', function () {
                                var val = colorInput.value();
                                colorPicker.value(val);
                            });

                            // Đồng bộ Màu nền
                            var bgPicker = win.find('#bg_picker')[0];
                            var bgInput = win.find('#bg')[0];

                            bgPicker.on('change', function () {
                                var val = bgPicker.value();
                                bgInput.value(val);
                            });

                            bgInput.on('keyup', function () {
                                var val = bgInput.value();
                                bgPicker.value(val);
                            });
                        },

                        onsubmit: function (e) {

                            var text = e.data.text;

                            // Ưu tiên textbox vì nó có thể nhập bằng tay
                            var color = e.data.color || e.data.color_picker;
                            var bg = e.data.bg || e.data.bg_picker;

                            var html =
                                '<span class="antsomi-badge" style="color:' +
                                color + '; background:' + bg + ';">' + text + '</span>';

                            ed.execCommand('mceInsertContent', false, html);
                        }
                    });

                }
            });
        }
    });

    tinymce.PluginManager.add('badge_tag_button', tinymce.plugins.badge_tag_button);
})();
