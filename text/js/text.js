/* 
 * Boxer v3.0.3 - 2014-01-12
 * A jQuery plugin for displaying images, videos or content in a modal overlay. Part of the Formstone Library.
 * http://formstone.it/boxer/
 *
 * Copyright 2014 Ben Plum; MIT Licensed
 */

! function(a, b) {
	"use strict";

	function c(b) {
		return G.formatter = j, a(this).on("click.boxer", a.extend({}, G, b || {}), d)
	}

	function d(c) {
		var d = a(this),
			f = c.data.$object,
			g = d[0].attributes ? d.attr("href") || "" : "",
			i = g.toLowerCase().split("."),
			j = i[i.length - 1],
			l = "",
			m = "image" === l || "jpeg" === j || "jpg" === j || "gif" === j || "png" === j || "data:image" === g.substr(0, 10),
			o = g.indexOf("youtube.com/embed") > -1 || g.indexOf("player.vimeo.com/video") > -1,
			p = "url" === l || !m && !o && "http" === g.substr(0, 4),
			w = "element" === l || !m && !o && !p && "#" === g.substr(0, 1),
			x = "undefined" != typeof f;
		if (!(a("#boxer").length > 1) && (m || o || p || w || x)) {
			if (D(c), E = a.extend({}, {
				$window: a(b),
				$body: a("body"),
				$target: d,
				$object: f,
				visible: !1,
				resizeTimer: null,
				touchTimer: null,
				gallery: {
					active: !1
				},
				isMobile: F || c.data.mobile
			}, c.data), E.margin *= 2, E.containerHeight = E.height, E.containerWidth = E.width, E.type = m ? "image" : o ? "video" : "element", m || o) {
				var y = E.$target.attr("rel");
				"undefined" != typeof y && y !== !1 && (E.gallery.active = !0, E.gallery.rel = y, E.gallery.$items = a("a[rel= " + E.gallery.rel + "]"), E.gallery.index = E.gallery.$items.index(E.$target), E.gallery.total = E.gallery.$items.length - 1)
			}
			var z = "";
			return E.isMobile || (z += '<div id="boxer-overlay" class="' + E.customClass + '" style="opacity: 0"></div>'), z += '<div id="boxer" class="loading ' + E.customClass, E.isMobile && (z += " mobile"), p && (z += " iframe"), (w || x) && (z += " inline"), z += '" style="opacity: 0;', E.fixed === !0 && (z += " position: fixed;"), z += '">', z += '<span class="boxer-close">' + E.labels.close + "</span>", z += '<div class="boxer-container" style="', z += E.isMobile ? "height: 100%; width: 100%" : "height: " + E.height + "px; width: " + E.width + "px", z += '">', z += '<div class="boxer-content" style="opacity: 0;">', (m || o) && (z += '<div class="boxer-meta">', E.gallery.active ? (z += '<div class="boxer-arrow previous">' + E.labels.previous + "</div>", z += '<div class="boxer-arrow next">' + E.labels.next + "</div>", z += '<p class="boxer-position"', E.gallery.total < 1 && (z += ' style="display: none;"'), z += ">", z += '<span class="current">' + (E.gallery.index + 1) + "</span> " + E.labels.count + ' <span class="total">' + (E.gallery.total + 1) + "</span>", z += "</p>", z += '<div class="boxer-caption gallery">') : z += '<div class="boxer-caption">', z += E.formatter.apply(E.$body, [E.$target]), z += "</div></div>"), z += "</div></div></div>", E.$body.append(z), E.$overlay = a("#boxer-overlay"), E.$boxer = a("#boxer"), E.$container = E.$boxer.find(".boxer-container"), E.$content = E.$boxer.find(".boxer-content"), E.$meta = E.$boxer.find(".boxer-meta"), E.$position = E.$boxer.find(".boxer-position"), E.$caption = E.$boxer.find(".boxer-caption"), E.$arrows = E.$boxer.find(".boxer-arrow"), E.$animatables = a("#boxer-overlay, #boxer, .boxer-container"), E.paddingVertical = parseInt(E.$boxer.css("paddingTop"), 10) + parseInt(E.$boxer.css("paddingBottom"), 10), E.paddingHorizontal = parseInt(E.$boxer.css("paddingLeft"), 10) + parseInt(E.$boxer.css("paddingRight"), 10), h(), E.gallery.active && r(), E.$window.on("resize.boxer", H.resize).on("keydown.boxer", s), E.$body.on("touchstart.boxer click.boxer", "#boxer-overlay, #boxer .boxer-close", e).on("touchmove.boxer", D), E.gallery.active && E.$boxer.on("touchstart.boxer click.boxer", ".boxer-arrow", q), E.$overlay.stop().animate({
				opacity: E.opacity
			}, E.duration), E.$boxer.stop().animate({
				opacity: 1
			}, E.duration, function() {
				m ? k(g) : o ? n(g) : p ? u(g) : w ? t(g) : x ? v(E.$object) : a.error("BOXER: '" + g + "' is not valid.")
			}), x ? E.$boxer : void 0
		}
	}

	function e(b) {
		D(b), "undefined" != typeof E.$animatables && (E.$animatables.stop().animate({
			opacity: 0
		}, E.duration, function() {
			a(this).remove()
		}), B(E.resizeTimer), E.$window.off(".boxer"), E.$body.off(".boxer").removeClass("boxer-open"), E.gallery.active && E.$boxer.off(".boxer"), E.isMobile && "image" === E.type && E.gallery.active && E.$container.off(".boxer"), E.$window.trigger("close.boxer"), E = {})
	}

	function f() {
		var a = i(),
			b = 0,
			c = E.isMobile ? 0 : E.duration;
		E.isMobile || (b = E.$arrows.outerHeight(), E.$arrows.css({
			marginTop: (E.contentHeight - E.metaHeight - b) / 2
		})), !E.visible && E.isMobile && E.gallery.active && E.$content.on("touchstart.boxer", ".boxer-image", x), (E.isMobile || E.fixed) && E.$body.addClass("boxer-open"), E.$boxer.stop().animate({
			left: a.left,
			top: a.top
		}, c), E.$container.show().stop().animate({
			height: E.containerHeight,
			width: E.containerWidth
		}, c, function() {
			E.$content.stop().animate({
				opacity: 1
			}, E.duration), E.$boxer.removeClass("loading").find(".boxer-close").stop().animate({
				opacity: 1
			}, E.duration), E.visible = !0, E.callback.apply(E.$boxer), E.$window.trigger("open.boxer"), E.gallery.active && p()
		})
	}

	function g(a) {
		if (a = a || !1, E.visible) {
			var b = i(),
				c = 0;
			E.isMobile || (c = E.$arrows.outerHeight(), E.$arrows.css({
				marginTop: (E.contentHeight - E.metaHeight - c) / 2
			})), a ? (E.$boxer.stop().animate({
				left: b.left,
				top: b.top
			}, E.duration), E.$container.show().stop().animate({
				height: E.containerHeight,
				width: E.containerWidth
			})) : (E.$boxer.css({
				left: b.left,
				top: b.top
			}), E.$container.css({
				height: E.containerHeight,
				width: E.containerWidth
			}))
		}
	}

	function h() {
		var a = i();
		E.$boxer.css({
			left: a.left,
			top: a.top
		})
	}

	function i() {
		if (E.isMobile) return {
			left: 0,
			top: 0
		};
		var a = {
			left: (E.$window.width() - E.containerWidth - E.paddingHorizontal) / 2,
			top: E.top <= 0 ? (E.$window.height() - E.containerHeight - E.paddingVertical) / 2 : E.top
		};
		return E.fixed !== !0 && (a.top += E.$window.scrollTop()), a
	}

	function j(a) {
		var b = a.attr("title");
		return "" !== b && void 0 !== b ? '<p class="caption">' + b + "</p>" : ""
	}

	function k(b) {
		E.$image = a("<img />"), E.$image.one("load.boxer", function() {
			var a = C(E.$image);
			E.naturalHeight = a.naturalHeight, E.naturalWidth = a.naturalWidth, E.retina && (E.naturalHeight /= 2, E.naturalWidth /= 2), E.$content.prepend(E.$image), "" === E.$caption.html() ? E.$caption.hide() : E.$caption.show(), l(), f()
		}).attr("src", b).addClass("boxer-image"), (E.$image[0].complete || 4 === E.$image[0].readyState) && E.$image.trigger("load")
	}

	function l() {
		var a = 0;
		for (E.windowHeight = E.viewportHeight = E.$window[0].innerHeight, E.windowWidth = E.viewportWidth = E.$window[0].innerWidth, E.containerHeight = 1 / 0, E.contentHeight = 0, E.containerWidth = 1 / 0, E.contentWidth = 0, E.imageMarginTop = 0, E.imageMarginLeft = 0; E.containerHeight > E.viewportHeight && 2 > a;) E.imageHeight = 0 === a ? E.naturalHeight : E.$image.outerHeight(), E.imageWidth = 0 === a ? E.naturalWidth : E.$image.outerWidth(), E.metaHeight = 0 === a ? 0 : E.metaHeight, 0 === a && (E.ratioHorizontal = E.imageHeight / E.imageWidth, E.ratioVertical = E.imageWidth / E.imageHeight, E.isWide = E.imageWidth > E.imageHeight), E.imageHeight < E.minHeight && (E.minHeight = E.imageHeight), E.imageWidth < E.minWidth && (E.minWidth = E.imageWidth), E.isMobile ? (E.$meta.css({
			width: E.windowWidth
		}), E.metaHeight = E.$meta.outerHeight(!0), E.contentHeight = E.viewportHeight, E.contentWidth = E.viewportWidth, E.containerHeight = E.viewportHeight - E.paddingVertical, E.containerWidth = E.viewportWidth - E.paddingHorizontal, m(), E.imageMarginTop = (E.containerHeight - E.targetImageHeight - E.metaHeight) / 2, E.imageMarginLeft = (E.containerWidth - E.targetImageWidth) / 2) : (0 === a && (E.viewportHeight -= E.margin + E.paddingVertical, E.viewportWidth -= E.margin + E.paddingHorizontal), E.viewportHeight -= E.metaHeight, m(), E.containerHeight = E.contentHeight = E.targetImageHeight, E.containerWidth = E.contentWidth = E.targetImageWidth), E.$content.css({
			height: E.isMobile ? E.contentHeight : "auto",
			width: E.contentWidth
		}), E.$meta.css({
			width: E.contentWidth
		}), E.$image.css({
			height: E.targetImageHeight,
			width: E.targetImageWidth,
			marginTop: E.imageMarginTop,
			marginLeft: E.imageMarginLeft
		}), E.isMobile || (E.metaHeight = E.$meta.outerHeight(!0), E.containerHeight += E.metaHeight), a++
	}

	function m() {
		var a = E.isMobile ? E.containerHeight - E.metaHeight : E.viewportHeight,
			b = E.isMobile ? E.containerWidth : E.viewportWidth;
		E.isWide ? (E.targetImageWidth = b, E.targetImageHeight = E.targetImageWidth * E.ratioHorizontal, E.targetImageHeight > a && (E.targetImageHeight = a, E.targetImageWidth = E.targetImageHeight * E.ratioVertical)) : (E.targetImageHeight = a, E.targetImageWidth = E.targetImageHeight * E.ratioVertical, E.targetImageWidth > b && (E.targetImageWidth = b, E.targetImageHeight = E.targetImageWidth * E.ratioHorizontal)), (E.targetImageWidth > E.imageWidth || E.targetImageHeight > E.imageHeight) && (E.targetImageHeight = E.imageHeight, E.targetImageWidth = E.imageWidth), (E.targetImageWidth < E.minWidth || E.targetImageHeight < E.minHeight) && (E.targetImageWidth < E.minWidth ? (E.targetImageWidth = E.minWidth, E.targetImageHeight = E.targetImageWidth * E.ratioHorizontal) : (E.targetImageHeight = E.minHeight, E.targetImageWidth = E.targetImageHeight * E.ratioVertical))
	}

	function n(b) {
		E.$videoWrapper = a('<div class="boxer-video-wrapper" />'), E.$video = a('<iframe class="boxer-video" />'), E.$video.attr("src", b).addClass("boxer-video").prependTo(E.$videoWrapper), E.$content.prepend(E.$videoWrapper), o(), f()
	}

	function o() {
		E.windowHeight = E.viewportHeight = E.contentHeight = E.$window[0].innerHeight - E.paddingVertical, E.windowWidth = E.viewportWidth = E.contentWidth = E.$window[0].innerWidth - E.paddingHorizontal, E.videoMarginTop = 0, E.videoMarginLeft = 0, E.isMobile ? (E.$meta.css({
			width: E.windowWidth
		}), E.metaHeight = E.$meta.outerHeight(!0), E.viewportHeight -= E.metaHeight, E.targetVideoWidth = E.viewportWidth, E.targetVideoHeight = E.targetVideoWidth * E.videoRatio, E.targetVideoHeight > E.viewportHeight && (E.targetVideoHeight = E.viewportHeight, E.targetVideoWidth = E.targetVideoHeight / E.videoRatio), E.videoMarginTop = (E.viewportHeight - E.targetVideoHeight) / 2, E.videoMarginLeft = (E.viewportWidth - E.targetVideoWidth) / 2) : (E.viewportHeight = E.windowHeight - E.margin, E.viewportWidth = E.windowWidth - E.margin, E.targetVideoWidth = E.videoWidth > E.viewportWidth ? E.viewportWidth : E.videoWidth, E.targetVideoWidth < E.minWidth && (E.targetVideoWidth = E.minWidth), E.targetVideoHeight = E.targetVideoWidth * E.videoRatio, E.contentHeight = E.targetVideoHeight, E.contentWidth = E.targetVideoWidth), E.$content.css({
			height: E.isMobile ? E.contentHeight : "auto",
			width: E.contentWidth
		}), E.$meta.css({
			width: E.contentWidth
		}), E.$videoWrapper.css({
			height: E.targetVideoHeight,
			width: E.targetVideoWidth,
			marginTop: E.videoMarginTop,
			marginLeft: E.videoMarginLeft
		}), E.isMobile || (E.metaHeight = E.$meta.outerHeight(!0), E.contentHeight = E.targetVideoHeight + E.metaHeight), E.containerHeight = E.contentHeight, E.containerWidth = E.contentWidth
	}

	function p() {
		var b = "";
		E.gallery.index > 0 && (b = E.gallery.$items.eq(E.gallery.index - 1).attr("href"), b.indexOf("youtube.com/embed") < 0 && b.indexOf("player.vimeo.com/video") < 0 && a('<img src="' + b + '">')), E.gallery.index < E.gallery.total && (b = E.gallery.$items.eq(E.gallery.index + 1).attr("href"), b.indexOf("youtube.com/embed") < 0 && b.indexOf("player.vimeo.com/video") < 0 && a('<img src="' + b + '">'))
	}

	function q(b) {
		D(b);
		var c = a(this);
		c.hasClass("disabled") || (E.$boxer.addClass("loading"), E.gallery.index += c.hasClass("next") ? 1 : -1, E.gallery.index > E.gallery.total && (E.gallery.index = E.gallery.total), E.gallery.index < 0 && (E.gallery.index = 0), E.$content.stop().animate({
			opacity: 0
		}, E.duration, function() {
			"undefined" != typeof E.$image && E.$image.remove(), "undefined" != typeof E.$videoWrapper && E.$videoWrapper.remove(), E.$target = E.gallery.$items.eq(E.gallery.index), E.$caption.html(E.formatter.apply(E.$body, [E.$target])), E.$position.find(".current").html(E.gallery.index + 1);
			var a = E.$target.attr("href"),
				b = a.indexOf("youtube.com/embed") > -1 || a.indexOf("player.vimeo.com/video") > -1;
			b ? n(a) : k(a), r()
		}))
	}

	function r() {
		E.$arrows.removeClass("disabled"), 0 === E.gallery.index && E.$arrows.filter(".previous").addClass("disabled"), E.gallery.index === E.gallery.total && E.$arrows.filter(".next").addClass("disabled")
	}

	function s(a) {
		!E.gallery.active || 37 !== a.keyCode && 39 !== a.keyCode ? 27 === a.keyCode && E.$boxer.find(".boxer-close").trigger("click") : (D(a), E.$arrows.filter(37 === a.keyCode ? ".previous" : ".next").trigger("click"))
	}

	function t(b) {
		var c = a(b).find(">:first-child").clone();
		v(c)
	}

	function u(b) {
		b += b.indexOf("?") > -1 ? "&" + G.requestKey + "=true" : "?" + G.requestKey + "=true";
		var c = a('<iframe class="boxer-iframe" src="' + b + '" />');
		v(c);
		document.getElementById("myframe").onload = function() {
		  alert("myframe is loaded");
		};
	}

	function v(a) {
		E.$content.append(a), w(a), f()
	}

	function w(a) {
		E.objectHeight = a.outerHeight(!0), E.objectWidth = a.outerWidth(!0), E.windowHeight = E.$window.height() - E.paddingVertical, E.windowWidth = E.$window.width() - E.paddingHorizontal, E.maxHeight = E.windowHeight < 0 ? G.minHeight : E.windowHeight, E.isIframe = a.is("iframe"), E.objectMarginTop = 0, E.objectMarginLeft = 0, E.isMobile || (E.windowHeight -= E.margin, E.windowWidth -= E.margin), E.contentHeight = void 0 !== E.dataHeight ? E.dataHeight : E.isIframe ? E.windowHeight : E.objectHeight, E.contentWidth = void 0 !== E.dataWidth ? E.dataWidth : E.isIframe ? E.windowWidth : E.objectWidth, E.isIframe && E.isMobile && (E.contentHeight = E.windowHeight, E.contentWidth = E.windowWidth), E.containerHeight = E.contentHeight, E.containerWidth = E.contentWidth, E.$content.css({
			height: E.contentHeight,
			width: E.contentWidth
		})
	}

	function x(a) {
		if (D(a), B(E.touchTimer), !E.isAnimating) {
			var b = "undefined" != typeof a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0] : null;
			E.xStart = b ? b.pageX : a.clientX, E.leftPosition = 0, E.touchMax = 1 / 0, E.touchMin = -1 / 0, E.edge = .25 * E.contentWidth, 0 === E.gallery.index && (E.touchMax = 0), E.gallery.index === E.gallery.total && (E.touchMin = 0), E.$boxer.on("touchmove.boxer", y).one("touchend.boxer", z)
		}
	}

	function y(a) {
		var b = "undefined" != typeof a.originalEvent.targetTouches ? a.originalEvent.targetTouches[0] : null;
		E.delta = E.xStart - (b ? b.pageX : a.clientX), E.delta > 20 && D(a), E.canSwipe = !0;
		var c = -E.delta;
		c < E.touchMin && (c = E.touchMin, E.canSwipe = !1), c > E.touchMax && (c = E.touchMax, E.canSwipe = !1), E.$image.css({
			transform: "translate3D(" + c + "px,0,0)"
		}), E.touchTimer = A(E.touchTimer, 300, function() {
			z(a)
		})
	}

	function z(a) {
		D(a), B(E.touchTimer), E.$boxer.off("touchmove.boxer touchend.boxer"), E.delta && (E.$boxer.addClass("animated"), E.swipe = !1, E.canSwipe && (E.delta > E.edge || E.delta < -E.edge) ? (E.swipe = !0, E.delta <= E.leftPosition ? E.$image.css({
			transform: "translate3D(" + E.contentWidth + "px,0,0)"
		}) : E.$image.css({
			transform: "translate3D(" + -E.contentWidth + "px,0,0)"
		})) : E.$image.css({
			transform: "translate3D(0,0,0)"
		}), E.swipe && E.$arrows.filter(E.delta <= E.leftPosition ? ".previous" : ".next").trigger("click"), A(E.resetTimer, E.duration, function() {
			E.$boxer.removeClass("animated")
		}))
	}

	function A(a, b, c) {
		return B(a), setTimeout(c, b)
	}

	function B(a) {
		a && (clearTimeout(a), a = null)
	}

	function C(a) {
		var b = a[0],
			c = new Image;
		return "undefined" != typeof b.naturalHeight ? {
			naturalHeight: b.naturalHeight,
			naturalWidth: b.naturalWidth
		} : "img" === b.tagName.toLowerCase() ? (c.src = b.src, {
			naturalHeight: c.height,
			naturalWidth: c.width
		}) : !1
	}

	function D(a) {
		a.preventDefault && (a.stopPropagation(), a.preventDefault())
	}
	var E = {},
		F = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(b.navigator.userAgent || b.navigator.vendor || b.opera),
		G = {
			callback: a.noop,
			customClass: "",
			duration: 250,
			fixed: !1,
			formatter: a.noop,
			height: 100,
			labels: {
				close: "Close",
				count: "of",
				next: "Next",
				previous: "Previous"
			},
			margin: 50,
			minHeight: 100,
			minWidth: 100,
			mobile: !1,
			opacity: .75,
			retina: !1,
			requestKey: "boxer",
			top: 0,
			videoRatio: .5625,
			videoWidth: 600,
			width: 100
		},
		H = {
			defaults: function(b) {
				return G = a.extend(G, b || {}), a(this)
			},
			destroy: function() {
				return e(), a(this).off(".boxer")
			},
			resize: function() {
				return "undefined" != typeof E.$boxer && ("element" === E.type ? w(E.$content.find(">:first-child")) : "image" === E.type ? l() : "video" === E.type && o(), g()), a(this)
			}
		};
	a.fn.boxer = function(a) {
		return H[a] ? H[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof a && a ? this : c.apply(this, arguments)
	}, a.boxer = function(c, e) {
		return H[c] ? H[c].apply(b, Array.prototype.slice.call(arguments, 1)) : d.apply(b, [{
			data: a.extend({
				$object: c
			}, G, e || {})
		}])
	}
}(jQuery, window);