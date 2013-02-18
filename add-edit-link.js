    //<source lang="javascript">
    
    /*
     * Пользовательский JS-скрипт add-edit-link для rodovid.org.
     * Добавляет ссылку на редактирование страницы персоны к каждой
     * ссылке на страницу персоны (удобно при частых правках).
     *
     * Основано на оригинальном коде пользователя http://ru.rodovid.org/wk/User:Hazzik
     * Изменения и дополнения внесены пользователем http://ru.rodovid.org/wk/User:AntonioK
     *
     * Пользуйтесь и улучшайте!
     */
    
    (function ($) {
        $(function () {
            $('html').addClass('add-edit-link-user-js');
    
            $('a[href^="' + encodeURI('/wk/Запись:') + '"]', '#bodyContent').after(function () {
                var a = $('<!--added-edit-link-->&nbsp;<a>');
                a.attr('href', $(this).attr('href') + '?action=edit');
                a.attr('title', 'редактировать запись');
                a.html('<sup>[edit]</sup>');
                return a;
            });
        });
    })(jQuery);
    //</source>
