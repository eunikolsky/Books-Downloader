function parse(){

    var playList = {};
    var playerInit = /audioPlayer\((\d+),\d+/.exec($('script').text());
    if(!playerInit || !playerInit[1]){
        return false;
    }

    $.ajax('//audioknigi.club/rest/bid/' + playerInit[1], {
        async: false,
        success: function(content){
            playList = content;
        }
    });

    var mp3 = {};
    $.each(playList, function(key, value){
        var url = value.mp3;
        mp3[url] = {
            url: url,
            title: value.title
        };
    });

    var title = $('.topic-header h1').text().trim();
    function getDescriptionText(){
        var text = [
            title + "\n",
            $('.topic-content').text().trim() + "\n\n"
        ];
        var $meta = $('.book-info .panel-item:not(.flab-rating)').clone();
        $meta.find('.voting-total, .fa').remove();
        $meta.each(function(){
            var $this = $(this);
            text.push($this.text().trim().replace(/\s+/, ' '));
        });
        return text.join("\n");
    }

    return {
        title: title,
        desc: getDescriptionText(),
        image: $('.picture-side img:last').attr('src'),
        files: mp3
    };
}