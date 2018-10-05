(function(){

  var options = {
    controls: true,
    inactivityTimeout: 0
  };

  window.addEventListener('DOMContentLoaded', function(){

    var descriptions1 = [
      {
        time: '00:01',
        description: 'foo'
      },
      {
        time: '00:03',
        description: 'bar'
      },
      {
        time: '00:04',
        description: 'foo'
      },
      {
        time: '00:06',
        description: 'bar'
      },
      {
        time: '00:08',
        description: 'bar'
      },
      {
        time: '00:09',
        description: 'bar'
      },
      {
        time: '00:10',
        description: 'bar'
      }

    ];

    var v1 = videojs('video1', options);
    createDescriptionEl( v1, 'description1', descriptions1);
    v1.on('timeupdate', function(){
      scrollAndHighlightDesc(v1, 'description1', descriptions1)
    });


    // ----------------------------------------------------
    // Create description area
    // ----------------------------------------------------
    function createDescriptionEl(v, descAreaId, dataList) {
      var $description = $('#' + descAreaId);
      var $ul = $('<ul>');
      dataList.forEach(function(data){
        var $li = $('<li>');
        $li.attr('data-sec', moment(data.time, 'mm:ss').second());
        $li.attr('id', descAreaId + '-' + moment(data.time, 'mm:ss').second());
        $li.text(data.time + '  ' +data.description);
        $ul.append($li);
      });
      $description.append($ul);
      $ul.on('click', 'li', function(e){
        v.currentTime(parseInt($(e.target).attr('data-sec'), 10));
        v.play();
      })
    };

    // ----------------------------------------------------
    // Description scroll and highlight
    // ----------------------------------------------------
    function scrollAndHighlightDesc(v, descAreaId, dataList){
      var currentTimeInt = parseInt(v.currentTime(), 10);
      var data = dataList.filter(function(d){
        return moment(d.time, 'mm:ss').second() === currentTimeInt;
      });
      if(data[0]){
        var $active = $('#' + descAreaId + '-' + moment(data[0].time, 'mm:ss').second());
        $('#' + descAreaId + ' li').removeClass('active')
        $active.addClass('active');
        var offsetY = 10;
        var scrollPosY = $active[0].offsetTop - $('#' + descAreaId)[0].offsetTop - offsetY;
        $('#' + descAreaId).scrollTop(scrollPosY);
      }
    }
  })
})();
