
  
  // fixed header with calc of header

    var theWindow = $(window),
        body = $("body"),
        header = $("header"),
        headerBottom = header.outerHeight();
    if(window.location.hash && theWindow.width() > 1000) {
		body.addClass("fix-nav").css('padding-top', headerBottom);;
	}

    theWindow.on("scroll", function () {
            if (theWindow.scrollTop() >= headerBottom) {
                body.addClass("fix-nav").css('padding-top', headerBottom);
            } else if (theWindow.scrollTop() <= headerBottom) {
                body.removeClass("fix-nav").css('padding-top','0');
            }
    });

    $(function () {			
        //tnvideos defaults
        $("[data-player]").tntvideos({		
            playButton: '.play',
            closeButton: '.close',
            bodyPlaying: '.playing',
            mobileWidth: 900
        });			
    });

    /* get device */
function getOS() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
		return 'iOS'
	} else if (userAgent.match(/Android/i)) {
		return 'Android'
	} else {
		return 'unknown'
	}
}

/* retrive youtube video */
(function ($) {
	$.fn.setupYoutube = function () {
		iframe = document.createElement("iframe");
		iframe.setAttribute("frameborder", "0");
		iframe.setAttribute("allowfullscreen", "");
		iframe.setAttribute("width", this.attr("data-width"));
		iframe.setAttribute("height", this.attr("data-height"));
		iframe.setAttribute("src", "https://www.youtube.com/embed/" + this.attr("data-embed") + "?rel=0&autoplay=1&playsinline=1&enablejsapi=1");
		this.prepend(iframe);
		var videoRatio = (iframe.height / iframe.width) * 100;
		iframe.style.position = 'absolute';
		iframe.style.top = '0';
		iframe.style.left = '0';
		iframe.style.right = '0';
		iframe.width = '100%';
		iframe.height = '100%';
		var wrap = document.createElement('div');
		wrap.className = 'fluid-vid';
		wrap.style.width = '100%';
		wrap.style.position = 'relative';
		wrap.style.paddingTop = videoRatio + '%';
		var iframeParent = iframe.parentNode;
		iframeParent.insertBefore(wrap, iframe);
		wrap.appendChild(iframe)
	}
})(jQuery);

$('.youtube').each(function () {
	//check if div is empty
	if($(this).is(':empty')) {
		$(this)
			.empty()
			.append('<img alt="youtube thumbnail" class="thumbnail" src="https://img.youtube.com/vi/' +	$(this).data('embed') + '/maxresdefault.jpg">');
	}
	$(this).on("click", function () {
		$(this).find(".thumbnail").remove();
		for (var i = 0; i < $('iframe').length; i++) {
			$('iframe')[i].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
		$(this).addClass("active").setupYoutube();
	});
});  

/* TNT Videos 1.3
/* SWAP for vimeo-solo option with data-mode="swap" */
/* Update/fix button's logic statements */

/* v1.2
/* Small update for vimeo with static mode, use data-mode="static" 
/* New responsive play append for mobile, use data-mobile-append-play="" 
/* v1.1
/* NEW Close button string option 
/* Fixed duplicate buttons 
/* Responsive Vimeo Solo ***must include .thumbnail */

/* ToDo:
/* Vimeo thumbnail see:
/* https://i.vimeocdn.com/video/726692981_960.webp */

!function(e) {
    e.fn.extend({
        tntvideos: function(t) {
            var o = {
                playButton: ".play",
                closeButton: ".close",
                closeButtonString: null,
                animate: !0,
                offset: e("header").outerHeight(),
                bodyPlaying: null,
                mobileWidth: 900,
                onPlay: function() {},
                onClose: function() {}
            };
            t = e.extend(o, t);
            var a = this.length - 1;
            return this.each(function(o) {
                var d = t, l = d.closeButton.replace(/\./g, ""), s = e(this), r = s.data("player");
                if (e(window).width() > d.mobileWidth && ("vimeo" != r && "vimeo-solo" != r || (e(this).find(".thumbnail").remove(), 
                i(s))), e(window).width() < d.mobileWidth && e(this).find(d.playButton).appendTo(e(this).find("[data-embed]")), 
                null != d.closeButtonString) var u = d.closeButtonString; else u = '<i class="icon-plus"></i> Close Video';
                if (e(this).on("click", d.playButton, function() {
                    var o = s.data("player");
                    null != d.bodyPlaying && e("body").addClass(d.bodyPlaying.replace(/\./g, "")), s.find(d.playButton).hide(), 
                    "vimeo" == o ? function(e, t, o) {
                        e.addClass("playing").find("[data-embed]").append('<a class="' + t + '">' + o + "</a>").setupYoutube(), 
                        e.find("video, .thumbnail").hide();
                    }(s, l, u) : "youtube" == o && function(t, o, a) {
                        t.addClass("playing").find("[data-embed]").append('<a class="' + o + '">' + a + "</a>"), 
                        t.find(".thumbnail").hide();
                        for (var i = 0; i < e("iframe").length; i++) e("iframe")[i].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                        t.addClass("active").find("[data-embed]").setupYoutube();
                    }(s, l, u), "vimeo-solo" == o && (e(window).width() < d.mobileWidth && i(s), n(s, l, u)), 
                    e(window).width() > d.mobileWidth && 1 == d.animate && e("html, body").animate({
                        scrollTop: s.find("[data-embed]").offset().top - d.offset
                    }, 1e3);
                    for (var a = 0; a < e("iframe").length; a++) e("iframe")[a].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                    return t.onPlay.call(this), !1;
                }), e(this).on("click", d.closeButton, function() {
                    var o = e(this).parents("[data-player]"), a = o.data("player");
                    o.removeClass("playing"), o.find(".fluid-vid, iframe").remove(), o.find(d.closeButton).remove(), 
                    o.find("video, .thumbnail").show(), o.find(d.playButton).show(), null != d.bodyPlaying && e("body").removeClass(d.bodyPlaying.replace(/\./g, ""));
                    return "vimeo-solo" == a && (e(window).width() < t.mobileWidth ? o.find("video").remove() : n(o, l, u, !0)), 
                    1 == d.animate && e("html, body").animate({
                        scrollTop: o.offset().top - d.offset
                    }, 1e3), t.onClose.call(this), !1;
                }), o == a) return !1;
            });
            function i(e) {
                e.find("[data-embed]").prepend('<video autoplay="true" muted="muted" loop="true" src="https://player.vimeo.com/progressive_redirect/playback/' + e.data("vimeo") + '"></video>');
            }
            function n(e, t, o, a) {
                var i = e.find("video");
                a ? (e.removeClass("playing"), i.attr({
                    controls: "false",
                    muted: "true",
                    loop: "true"
                }), i[0].muted = 1, i[0].controls = 0) : (e.addClass("playing").find("[data-embed]").append('<a class="' + t + '">' + o + "</a>").find(".thumbnail").hide(), 
                i.attr({
                    controls: "true",
                    muted: "false",
                    loop: "false"
                }), i[0].currentTime = 0, i[0].muted = 0, i[0].controls = 1);
            }
        }
    });
}(jQuery);
$(document).ready(function(){
    $('.slider').slick({
        dots: true,
        arrows: false
    });
  });
// Copyright Year Auto Update
date = document.getElementById("copyDate");
date.innerHTML = new Date().getFullYear();