    //<source lang="javascript">
    
    /*
     * Пользовательский JS-скрипт add-recentchanges-link для rodovid.org.
     * Добавляет в меню ссылку на список последних правок, сделанных не Вами.
     *
     * Пользуйтесь и улучшайте!
     */
    
    (function ($) {
        $(function () {
            $('html').addClass('add-recentchanges-link-user-js');
    
            $('li#n-recentchanges', '#p-navigation').after(function () {
                var a = $('<!--added-recentchanges-link--><a>');
                a.attr('href', '/wk?title=Special:Recentchanges&limit=1000&days=30&hidebots=0&hidemyself=1');
                a.attr('title', '1000 последних правок, сделанных не мною');
                a.html('Свежие чужие&nbsp;правки');
                return $('<li></li>').prepend(a);
            });
        });
    })(jQuery);
    //</source>
