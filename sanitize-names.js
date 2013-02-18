    //<source lang="javascript">
    
    /*
     * Пользовательский JS-скрипт sanitize-names для rodovid.org.
     * Помогает выявлять и полуавтоматически исправлять типичные ошибки заполнения страниц персон.
     *
     * Основано на оригинальном скрипте пользователя http://ru.rodovid.org/wk/User:Hazzik
     * Изменения и дополнения внесены пользователем http://ru.rodovid.org/wk/User:AntonioK
     *
     * Пользуйтесь и улучшайте!
     */
    
    (function ($) {
        var names = {
            'Агафія':    'Агафья',
            'Ангеліна':  'Ангелина',
            'Анжеліка':  'Анжелика',
            'Віра':      'Вера',
            'Ганна':     'Анна',
            'Євгенія':   'Евгения',
            'Євдокія':   'Евдокия',
            'Інна':      'Инна',
            'Ірина':     'Ирина',
            'Любов':     'Любовь',
            'Марія':     'Мария',
            'Надія':     'Надежда',
            'Наталія':   'Наталья',
            'Раїса':     'Раиса',
            'Світлана':  'Светлана',
            'Тетяна':    'Татьяна',
            'Христина':  'Кристина',
            'Юлія':      'Юлия',
    
            'Анатолій':  'Анатолий',
            'Андрій':    'Андрей',
            'Антін':     'Антон',
            'Василь':    'Василий',
            'Віктор':    'Виктор',
            'Віталій':   'Виталий',
            'Володимир': 'Владимир',
            'Гаврило':   'Гаврила',
            'Геннадій':  'Геннадий',
            'Григорій':  'Григорий',
            'Дмитро':    'Дмитрий',
            'Едуард':    'Эдуард',
            'Іван':      'Иван',
            'Ігор':      'Игорь',
            'Микола':    'Николай',
            'Михайло':   'Михаил',
            'Нікіта':    'Никита',
            'Олександр': 'Александр',
            'Олексій':   'Алексей',
            'Петро':     'Пётр',
            'Павло':     'Павел',
            'Сергій':    'Сергей',
            'Федір':     'Фёдор',
            'Юрій':      'Юрий',
            'Яків':      'Яков'
        };
    
        var letters = {
            'Є': 'Е',
            'є': 'е',
            'І': 'И',
            'і': 'и'
        };
    
        var summary = [];
    
        function appendSummary(text) {
            if (summary.indexOf(text) == -1)
                summary.push(text);
        };
    
        $(function () {
            $('html').addClass('sanitize-names-user-js');
            
            $('a[href^="/wk/%D0%A0%D0%BE%D0%B4:"]').filter(function(i, e) {
                return $(e).text().match(/(ов$)|(ев$)|(ин$)|(ова$)|(ева$)|(ина$)|(ой$)|(ий$)|(ая$)|(вич$)/);
            }).css({
                'background-color': 'darkred',
                'color': 'white'
            });
    
            var name = $('input[name=nameatbirth]');
            if (name.length) {
                var nameValue = name.val() || '';
                var parts = nameValue.split(/\s/);
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i];
                    for (var k in names) {
                        part = part.replace(new RegExp('^' + k + '$'), names[k]);
                    }
                    parts[i] = part;
                }
                nameValue = parts.join(' ');
                if (nameValue != name.val()) {
                    name.val(nameValue);
                    name.css({'background-color': 'aqua'});
                    appendSummary('автоматический перевод имени с украинского на русский язык');
                }
            }
    
            var fname = $('input[name=fnameatbirth]');
            if (fname.length) {
                var fnameValue = fname.val() || '';
                for (var k in letters) {
                    fnameValue = fnameValue.replace(new RegExp(k, 'g'), letters[k]);
                }
                if (fnameValue != fname.val()) {
                    fname.val(fnameValue);
                    fname.css({'background-color': 'aqua'});
                    appendSummary('автоматическая транслитерация фамилии с украинского на русский язык');
                }
            }
    
            var clan = $('input[name=clan]');
            if (clan.length) {
                var clanValue = clan.val() || '';
                if (clanValue.match(/(ов$)|(ев$)|(ин$)/)) {
                    clanValue = clanValue + 'ы';
                }
                if (clanValue.match(/(ова$)|(ева$)|(ина$)/)) {
                    clanValue = clanValue.substring(0, clanValue.length - 1) + 'ы';
                }
                if (clanValue.match(/(ий$)/)) {
                    clanValue = clanValue.substring(0, clanValue.length - 2) + 'ие';
                }
                if (clanValue.match(/(ая$)/)) {
                    if (clanValue.match(/(тая$)|(ная$)/)) {
                        clanValue = clanValue.substring(0, clanValue.length - 2) + 'ые';
                    } else {
                        clanValue = clanValue.substring(0, clanValue.length - 2) + 'ие';
                    }
                }
                if (clanValue.match(/(ой$)/)) {
                    clanValue = clanValue.substring(0, clanValue.length - 2) + 'ые';
                }
                if (clanValue.match(/(вич$)/)) {
                    clanValue = clanValue + 'и';
                }
                if (clanValue != clan.val()) {
                    clan.val(clanValue);
                    clan.css({'background-color': 'aqua'});
                    appendSummary('род автоматически приведён к форме именительного падежа множественного числа');
                }
            }
    
            if (summary.length) {
                $('#wpSummary').val(summary.join('; '));
                $('#wpMinoredit').attr('checked', 'checked');
            }
    
            if (location.hash == '#save') {
                $('#wpSave').click();
            }
        });
    })(jQuery);
    //</source>
