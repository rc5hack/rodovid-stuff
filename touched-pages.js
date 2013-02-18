    //<source lang="javascript">
    
    /*
     * Пользовательский JS-скрипт touched-pages для rodovid.org.
     * Добавляет в меню ссылку на список всех затронутых Вами страниц
     * и формирует этот список, в порядке от самых старых правок к самым новым.
     * При этом каждая страница появляется в этом списке лишь единожды.
     *
     * Автор — http://ru.rodovid.org/wk/User:AntonioK
     *
     * Пользуйтесь и улучшайте!
     */
    
    (function ($) {
        $(function () {
            $('html').addClass('touched-pages-user-js');
    
            $('<a>')
                .attr('href', '/wk/User:' + wgUserName + '/#touched-pages')
                .html('Затронутые&nbsp;страницы')
                .insertAfter('#pt-mycontris', '#p-personal')
                .wrap('<li id="touched-pages"></li>');
    
            $('#touched-pages a', 'ul').click(function(){
                var links = [];
    
                function parseData(data, links) {
                   $(data).each(function(){
                        if (links.indexOf(this.title) == -1)
                        {
                            var a = $('<a>').attr('href', '/wk/' + this.title).attr('target', '_blank').html(this.title);
                            $('#bodyContent', '#content').append(a).append('<br />');
                            links.push(this.title);
                        }
                    });
                }
    
                function loadAdditionalDataIfNeeded(data, links)
                {
                    if (data['query-continue'] && data['query-continue']['usercontribs']['ucstart'] > 1 && confirm('Показаны не все результаты. Добрать недостающие?'))
                    {
                        $.get(
                            '/api.php',
                            {
                                format: 'json',
                                list: 'usercontribs',
                                action: 'query',
                                uclimit: 500,
                                ucdir: 'newer',
                                ucuser: wgUserName,
                                ucstart: data['query-continue']['usercontribs']['ucstart']
                            },
                            function(data)
                            {
                                if (data.query)
                                {
                                    parseData(data.query.usercontribs, links);
    
                                    loadAdditionalDataIfNeeded(data, links);
    
                                    $('#bodyContent', '#content').prepend('Показано '+ $('a', '#bodyContent').length +' затронутых страниц.<br /><br />');
                                }
                            },
                            'json'
                        );
                    }
                }
    
                $('#p-cactions').hide();
                $('#content .firstHeading').html('Затронутые&nbsp;страницы');
                $('#bodyContent', '#content').html('');
                $.get(
                    '/api.php',
                    {
                        format: 'json',
                        list: 'usercontribs',
                        action: 'query',
                        uclimit: 500,
                        ucdir: 'newer',
                        ucuser: wgUserName
                    },
                    function(data)
                    {
                        if (data.query)
                        {
                            parseData(data.query.usercontribs, links);
                            loadAdditionalDataIfNeeded(data, links);
                        }
                    },
                    'json'
                );
                return false;
            });
        });
    })(jQuery);
    //</source>
