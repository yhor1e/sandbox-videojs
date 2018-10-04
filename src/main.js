(function(){

  var dataList = window.dataList = [
    {
      time: 1,
      description: 'foo'
    },
    {
      time: 3,
      description: 'bar'
    }
  ];

  window.addEventListener('DOMContentLoaded', function(){
    console.log('DOMcontentLoaded');

    // create description list from dataList
    var $description = $('#description');
    var $ul = $('<ul>');
    dataList.forEach(function(data){
      var $li = $('<li>');
      var $a = $('<a>');
      $a.attr({
        'id': data.time,
        'href': '#' + data.time + 'sec'
      });
      $a.text(data.description);
      $li.append($a);
      $ul.append($li);
    });
    $description.append($ul);
    $ul.on('click', 'a', function(e){
      v.currentTime(parseInt(e.target.id, 10));
      v.play();
    })

    // initialize videojs instance
    window.v = videojs('my-video');
    v.on('timeupdate', function(e){
      var currentTimeInt = parseInt(v.currentTime(), 10);
      var data = dataList.filter(function(d){
        return d.time === currentTimeInt;
      });
      if(data[0]){
        console.log(data[0].time, data[0].description);
        var $active = $('#' + data[0].time);
        $('#description a').removeClass('active')
        $active.addClass('active');
      }
    });
  })
})();
