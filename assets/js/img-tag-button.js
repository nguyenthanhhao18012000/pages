(function () {
    tinymce.create('tinymce.plugins.img_tag_button', {
        init: function (ed, url) {
            ed.addButton('img_tag_button', {
                title: 'Chèn ảnh',
                icon: 'image',
                onclick: function () {
                    var frame = wp.media({
                        title: 'Chọn ảnh để chèn shortcode',
                        multiple: false,
                        library: {},
                        button: {
                            text: 'Chèn ảnh'
                        }
                    });

                    frame.on('select', function () {
                        var selection = frame.state().get('selection');
                        if (!selection || !selection.first()) return;

                        var attachment = selection.first().toJSON();
                        var alt = attachment.alt || '';
                        var shortcode = '<img src="' + attachment.url + '" alt="' + alt + '">';
                        ed.execCommand('mceInsertContent', false, shortcode);
                    });

                    frame.open();
                }
            });
        }
    });
    tinymce.PluginManager.add('img_tag_button', tinymce.plugins.img_tag_button);
})();
