
var videos = [
    'Ig-DbfPoz3o',
    'estPhyfBGho',
    '6JL4hpnZklk'
];

var index=Math.floor(Math.random() * videos.length);
var html=
'<div class="span4"><h3 class="meet">Meet the Makers</h3><iframe width="100%" height="200" src="http://www.youtube.com/embed/' + videos[index] + '" frameborder="0" allowfullscreen></iframe></div>';
document.write(html);