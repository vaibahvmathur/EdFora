var newsdata;
$(document).ready(function(){
    $.getJSON("http://starlord.hackerearth.com/edfora/hackernews", function( data ) {
        newsdata = data.slice(1)
        $('#pagination-demo').twbsPagination({
            totalPages: newsdata.length / 10 ,
            visiblePages: 6,
            next: 'Next',
            prev: 'Prev',
            onPageClick: function (event, page) {
                //fetch content and render here
                $("#page-content").empty();
                end = page*10;
                start = end-10;
                newsdatalist = newsdata.slice(start,end);
                $.each(newsdatalist, function( key, val ) {
                    domain = extractDomain(val['url']);
                    timediff = getTimeDiff(val['created_at']);
                    $("#page-content").append('<div class="well"><div><span class="main-content"><b>'+val["title"]+'</b></span><span class="extra-content">&nbsp&nbsp&nbsp('+domain+')</span></div><div class="shiftme"><span> '+ val["num_points"]+' points</span><span> by '+val["author"]+'</span><span> '+timediff+'day ago</span><span> | '+val["num_comments"]+' comments </span></div></div>');
                });
            }
        });        

    });    

    
    function extractDomain(url) {
        var domain;
        //find & remove protocol (http, ftp, etc.) and get domain
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }
        //find & remove port number
        domain = domain.split(':')[0];
        return domain;
    }
   
    
    function getTimeDiff(starttime){
        startTime = starttime.match(/(\d+)\/(\d+)\/(\d+)\s*(\d+):(\d+)/);
        start = new Date(startTime[3], startTime[2]-1, startTime[1], startTime[4], startTime[5], 0, 0);
        var end = new Date();
        console.log(end)
        console.log(start)
        var difference = new Date(start - end);
        var days = difference/1000/60/60/24;
        // return difference.getHours();
        return Math.floor(days)
    }



   
});