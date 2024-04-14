var ewww_webp_supported;
function shouldAutoScale(e) {
  if (1 == eio_lazy_vars.skip_autoscale) return !1;
  if (e.hasAttributes())
    for (
      var t = e.attributes, a = /skip-autoscale/, i = t.length - 1;
      0 <= i;
      i--
    ) {
      if (a.test(t[i].name)) return !1;
      if (a.test(t[i].value)) return !1;
    }
  return !0;
}
function constrainSrc(e, t, a, i) {
  if (null === e) return e;
  var r = /w=(\d+)/,
    n = /fit=(\d+),(\d+)/,
    o = /resize=(\d+),(\d+)/,
    s = decodeURIComponent(e);
  if (/\.svg(\?.+)?$/.exec(s)) return e;
  if (0 < e.search("\\?") && 0 < e.search(eio_lazy_vars.exactdn_domain)) {
    var l = o.exec(s);
    if (l && t < l[1])
      return "img-w" === i
        ? s.replace(o, "w=" + t)
        : "img-h" === i
        ? s.replace(o, "h=" + a)
        : s.replace(o, "resize=" + t + "," + a);
    o = r.exec(e);
    if (o && t <= o[1]) {
      if ("img-h" === i) return s.replace(r, "h=" + a);
      if ("bg-cover" !== i && "img-crop" !== i) return e.replace(r, "w=" + t);
      var d = o[1] - t;
      return 20 < d || a < 1080 ? e.replace(r, "resize=" + t + "," + a) : e;
    }
    d = n.exec(s);
    if (d && t < d[1]) {
      if ("bg-cover" !== i && "img-crop" !== i)
        return "img-w" === i
          ? s.replace(n, "w=" + t)
          : "img-h" === i
          ? s.replace(n, "h=" + a)
          : s.replace(n, "fit=" + t + "," + a);
      (s = d[1] - t), (n = d[2] - a);
      return 20 < s || 20 < n ? e.replace(r, "resize=" + t + "," + a) : e;
    }
    if (!o && !d && !l)
      return "img" === i
        ? e + "&fit=" + t + "," + a
        : "bg-cover" === i || "img-crop" === i
        ? e + "&resize=" + t + "," + a
        : "img-h" === i || t < a
        ? e + "&h=" + a
        : e + "&w=" + t;
  }
  return -1 == e.search("\\?") && 0 < e.search(eio_lazy_vars.exactdn_domain)
    ? "img" === i
      ? e + "?fit=" + t + "," + a
      : "bg-cover" === i || "img-crop" === i
      ? e + "?resize=" + t + "," + a
      : "img-h" === i || t < a
      ? e + "?h=" + a
      : e + "?w=" + t
    : e;
}
void 0 === ewww_webp_supported && (ewww_webp_supported = !1),
  (window.lazySizesConfig = window.lazySizesConfig || {}),
  (window.lazySizesConfig.expand =
    500 < document.documentElement.clientHeight &&
    500 < document.documentElement.clientWidth
      ? 1e3
      : 740),
  "undefined" == typeof eio_lazy_vars &&
    (eio_lazy_vars = {
      exactdn_domain: ".exactdn.com",
      threshold: 0,
      skip_autoscale: 0,
    }),
  50 < eio_lazy_vars.threshold &&
    (window.lazySizesConfig.expand = eio_lazy_vars.threshold),
  (function (e, t) {
    function a() {
      t(e.lazySizes), e.removeEventListener("lazyunveilread", a, !0);
    }
    (t = t.bind(null, e, e.document)),
      "object" == typeof module && module.exports
        ? t(require("lazysizes"))
        : "function" == typeof define && define.amd
        ? define(["lazysizes"], t)
        : e.lazySizes
        ? a()
        : e.addEventListener("lazyunveilread", a, !0);
  })(window, function (e, n, o) {
    "use strict";
    var s,
      l,
      d = {};
    function c(e, t, a) {
      var i, r;
      d[e] ||
        ((i = n.createElement(t ? "link" : "script")),
        (r = n.getElementsByTagName("script")[0]),
        t
          ? ((i.rel = "stylesheet"), (i.href = e))
          : ((i.onload = function () {
              (i.onerror = null), (i.onload = null), a();
            }),
            (i.onerror = i.onload),
            (i.src = e)),
        (d[e] = !0),
        (d[i.src || i.href] = !0),
        r.parentNode.insertBefore(i, r));
    }
    n.addEventListener &&
      ((l = /\(|\)|\s|'/),
      (s = function (e, t) {
        var a = n.createElement("img");
        (a.onload = function () {
          (a.onload = null), (a.onerror = null), (a = null), t();
        }),
          (a.onerror = a.onload),
          (a.src = e),
          a && a.complete && a.onload && a.onload();
      }),
      addEventListener(
        "lazybeforeunveil",
        function (e) {
          var t, a, i;
          if (e.detail.instance == o && !e.defaultPrevented) {
            var r = e.target;
            if (
              ("none" == r.preload &&
                (r.preload = r.getAttribute("data-preload") || "auto"),
              null != r.getAttribute("data-autoplay"))
            )
              if (r.getAttribute("data-expand") && !r.autoplay)
                try {
                  r.play();
                } catch (e) {}
              else
                requestAnimationFrame(function () {
                  r.setAttribute("data-expand", "-10"),
                    o.aC(r, o.cfg.lazyClass);
                });
            (t = r.getAttribute("data-link")) && c(t, !0),
              (t = r.getAttribute("data-script")) &&
                ((e.detail.firesLoad = !0),
                c(t, null, function () {
                  (e.detail.firesLoad = !1),
                    o.fire(r, "_lazyloaded", {}, !0, !0);
                })),
              (t = r.getAttribute("data-require")) &&
                (o.cfg.requireJs ? o.cfg.requireJs([t]) : c(t)),
              (a = r.getAttribute("data-bg")) &&
                ((e.detail.firesLoad = !0),
                s(a, function () {
                  (r.style.backgroundImage =
                    "url(" + (l.test(a) ? JSON.stringify(a) : a) + ")"),
                    (e.detail.firesLoad = !1),
                    o.fire(r, "_lazyloaded", {}, !0, !0);
                })),
              (i = r.getAttribute("data-poster")) &&
                ((e.detail.firesLoad = !0),
                s(i, function () {
                  (r.poster = i),
                    (e.detail.firesLoad = !1),
                    o.fire(r, "_lazyloaded", {}, !0, !0);
                }));
          }
        },
        !1
      ));
  }),
  (function (e, t) {
    function a() {
      t(e.lazySizes), e.removeEventListener("lazyunveilread", a, !0);
    }
    (t = t.bind(null, e, e.document)),
      "object" == typeof module && module.exports
        ? t(require("lazysizes"))
        : "function" == typeof define && define.amd
        ? define(["lazysizes"], t)
        : e.lazySizes
        ? a()
        : e.addEventListener("lazyunveilread", a, !0);
  })(window, function (n, e, o) {
    "use strict";
    var s;
    e.addEventListener &&
      ((s = /\(|\)|\s|'/),
      addEventListener(
        "lazybeforeunveil",
        function (e) {
          var t, a, i, r;
          e.detail.instance == o &&
            (e.defaultPrevented ||
              ("none" == e.target.preload && (e.target.preload = "auto"),
              (i = e.target.getAttribute("data-back")) &&
                (ewww_webp_supported &&
                  (r = e.target.getAttribute("data-back-webp")) &&
                  (i = r),
                (t = n.devicePixelRatio || 1),
                (a = Math.round(e.target.offsetWidth * t)),
                (r = Math.round(e.target.offsetHeight * t)),
                0 === i.search(/\[/) ||
                  (shouldAutoScale(e.target) &&
                    shouldAutoScale(e.target.parentNode) &&
                    (i = n.lazySizes.hC(e.target, "wp-block-cover")
                      ? (n.lazySizes.hC(e.target, "has-parallax")
                          ? ((a = Math.round(n.screen.width * t)),
                            (r = Math.round(n.screen.height * t)))
                          : r < 300 && (r = 430),
                        constrainSrc(i, a, r, "bg-cover"))
                      : n.lazySizes.hC(e.target, "cover-image") ||
                        n.lazySizes.hC(e.target, "elementor-bg") ||
                        n.lazySizes.hC(e.target, "et_parallax_bg") ||
                        n.lazySizes.hC(e.target, "bg-image-crop")
                      ? constrainSrc(i, a, r, "bg-cover")
                      : constrainSrc(i, a, r, "bg"))),
                e.target.style.backgroundImage &&
                -1 === e.target.style.backgroundImage.search(/^initial/)
                  ? 0 === i.search(/\[/)
                    ? ((i = JSON.parse(i)).forEach(function (e) {
                        s.test(e) && JSON.stringify(e);
                      }),
                      (i = 'url("' + i.join('"), url("') + '"'),
                      (r = e.target.style.backgroundImage + ", " + i),
                      (e.target.style.backgroundImage = r))
                    : (e.target.style.backgroundImage =
                        e.target.style.backgroundImage +
                        ', url("' +
                        (s.test(i) ? JSON.stringify(i) : i) +
                        '")')
                  : 0 === i.search(/\[/)
                  ? ((i = JSON.parse(i)).forEach(function (e) {
                      s.test(e) && JSON.stringify(e);
                    }),
                    (i = 'url("' + i.join('"), url("') + '"'),
                    (e.target.style.backgroundImage = i))
                  : (e.target.style.backgroundImage =
                      "url(" + (s.test(i) ? JSON.stringify(i) : i) + ")"))));
        },
        !1
      ));
  }),
  document.addEventListener("lazybeforesizes", function (e) {
    e.target.getAttribute("data-src");
    void 0 !== e.target._lazysizesWidth &&
      e.detail.width < e.target._lazysizesWidth &&
      (e.detail.width = e.target._lazysizesWidth);
  }),
  document.addEventListener("lazybeforeunveil", function (e) {
    var t,
      a,
      i,
      r,
      n,
      o = e.target,
      s = o.getAttribute("data-srcset");
    o.naturalWidth &&
      !s &&
      1 < o.naturalWidth &&
      1 < o.naturalHeight &&
      ((i = window.devicePixelRatio || 1),
      (a = o.naturalWidth),
      (r = o.naturalHeight),
      (t = o.getAttribute("data-eio-rwidth")),
      (e = o.getAttribute("data-eio-rheight")),
      t && a < t && ((a = t), (r = e)),
      (a = o.clientWidth && 1.25 * o.clientWidth < a),
      (r = o.clientHeight && 1.25 * o.clientHeight < r),
      (a || r) &&
        ((a = Math.round(o.offsetWidth * i)),
        (r = Math.round(o.offsetHeight * i)),
        (i = o.getAttribute("data-src")),
        (n = o.getAttribute("data-src-webp")),
        ewww_webp_supported && n && -1 == i.search("webp=1") && (i = n),
        (r =
          !(!shouldAutoScale(o) || !shouldAutoScale(o.parentNode)) &&
          (window.lazySizes.hC(o, "et_pb_jt_filterable_grid_item_image") ||
          window.lazySizes.hC(o, "ss-foreground-image") ||
          window.lazySizes.hC(o, "img-crop")
            ? constrainSrc(i, a, r, "img-crop")
            : window.lazySizes.hC(o, "object-cover") &&
              (window.lazySizes.hC(o, "object-top") ||
                window.lazySizes.hC(o, "object-bottom"))
            ? constrainSrc(i, a, r, "img-w")
            : window.lazySizes.hC(o, "object-cover") &&
              (window.lazySizes.hC(o, "object-left") ||
                window.lazySizes.hC(o, "object-right"))
            ? constrainSrc(i, a, r, "img-h")
            : window.lazySizes.hC(o, "ct-image") &&
              window.lazySizes.hC(o, "object-cover")
            ? constrainSrc(i, a, r, "img-crop")
            : constrainSrc(i, a, r, "img"))) &&
          i != r &&
          o.setAttribute("data-src", r))),
      ewww_webp_supported &&
        (!s ||
          ((s = o.getAttribute("data-srcset-webp")) &&
            o.setAttribute("data-srcset", s)),
        (n = o.getAttribute("data-src-webp")) && o.setAttribute("data-src", n));
  }),
  (function (e, t) {
    t = t(e, e.document, Date);
    (e.lazySizes = t),
      "object" == typeof module && module.exports && (module.exports = t);
  })("undefined" != typeof window ? window : {}, function (i, f, n) {
    "use strict";
    var g, z;
    if (
      (!(function () {
        var e,
          t = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            fastLoadedClass: "ls-is-cached",
            iframeLoadMode: 0,
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: !0,
            expFactor: 1.5,
            hFac: 0.8,
            loadMode: 2,
            loadHidden: !0,
            ricTimeout: 0,
            throttleDelay: 125,
          };
        for (e in ((z = i.lazySizesConfig || i.lazysizesConfig || {}), t))
          e in z || (z[e] = t[e]);
      })(),
      !f || !f.getElementsByClassName)
    )
      return { init: function () {}, cfg: z, noSupport: !0 };
    function c(e, t) {
      S(e, t) ||
        e.setAttribute("class", (e[y]("class") || "").trim() + " " + t);
    }
    function u(e, t) {
      (t = S(e, t)) &&
        e.setAttribute("class", (e[y]("class") || "").replace(t, " "));
    }
    function h(e, t) {
      var a;
      !l && (a = i.picturefill || z.pf)
        ? (t && t.src && !e[y]("srcset") && e.setAttribute("srcset", t.src),
          a({ reevaluate: !0, elements: [e] }))
        : t && t.src && (e.src = t.src);
    }
    var a,
      r,
      t,
      o,
      s,
      m = f.documentElement,
      l = i.HTMLPictureElement,
      d = "addEventListener",
      y = "getAttribute",
      e = i[d].bind(i),
      p = i.setTimeout,
      v = i.requestAnimationFrame || p,
      b = i.requestIdleCallback,
      w = /^picture$/i,
      _ = ["load", "error", "lazyincluded", "_lazyloaded"],
      C = {},
      A = Array.prototype.forEach,
      S = function (e, t) {
        return (
          C[t] || (C[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")),
          C[t].test(e[y]("class") || "") && C[t]
        );
      },
      E = function (t, a, e) {
        var i = e ? d : "removeEventListener";
        e && E(t, a),
          _.forEach(function (e) {
            t[i](e, a);
          });
      },
      x = function (e, t, a, i, r) {
        var n = f.createEvent("Event");
        return (
          ((a = a || {}).instance = g),
          n.initEvent(t, !i, !r),
          (n.detail = a),
          e.dispatchEvent(n),
          n
        );
      },
      L = function (e, t) {
        return (getComputedStyle(e, null) || {})[t];
      },
      N = function (e, t, a) {
        for (a = a || e.offsetWidth; a < z.minSize && t && !e._lazysizesWidth; )
          (a = t.offsetWidth), (t = t.parentNode);
        return a;
      },
      M = ((o = []), (s = t = []), (W._lsFlush = k), W);
    function k() {
      var e = s;
      for (s = t.length ? o : t, r = !(a = !0); e.length; ) e.shift()();
      a = !1;
    }
    function W(e, t) {
      a && !t
        ? e.apply(this, arguments)
        : (s.push(e), r || ((r = !0), (f.hidden ? p : v)(k)));
    }
    function j(a, e) {
      return e
        ? function () {
            M(a);
          }
        : function () {
            var e = this,
              t = arguments;
            M(function () {
              a.apply(e, t);
            });
          };
    }
    function I(e) {
      function t() {
        var e = n.now() - i;
        e < 99 ? p(t, 99 - e) : (b || r)(r);
      }
      var a,
        i,
        r = function () {
          (a = null), e();
        };
      return function () {
        (i = n.now()), (a = a || p(t, 99));
      };
    }
    var H,
      O,
      B,
      R,
      T,
      q,
      F,
      J,
      P,
      D,
      $,
      U,
      G,
      K,
      Q,
      V,
      X,
      Y,
      Z,
      ee,
      te,
      ae,
      ie,
      re,
      ne,
      oe,
      se,
      le,
      de,
      ce,
      ue,
      fe =
        ((Z = /^img$/i),
        (ee = /^iframe$/i),
        (te = "onscroll" in i && !/(gle|ing)bot/.test(navigator.userAgent)),
        (re = -1),
        (ne = function (e) {
          return (
            (U = null == U ? "hidden" == L(f.body, "visibility") : U) ||
            !(
              "hidden" == L(e.parentNode, "visibility") &&
              "hidden" == L(e, "visibility")
            )
          );
        }),
        (G = ze),
        (Q = ie = ae = 0),
        (V = z.throttleDelay),
        (X = z.ricTimeout),
        (Y =
          b && 49 < X
            ? function () {
                b(he, { timeout: X }), X !== z.ricTimeout && (X = z.ricTimeout);
              }
            : j(function () {
                p(he);
              }, !0)),
        (se = j(me)),
        (le = function (e) {
          se({ target: e.target });
        }),
        (de = j(function (t, e, a, i, r) {
          var n, o, s, l, d;
          (s = x(t, "lazybeforeunveil", e)).defaultPrevented ||
            (i && (a ? c(t, z.autosizesClass) : t.setAttribute("sizes", i)),
            (n = t[y](z.srcsetAttr)),
            (a = t[y](z.srcAttr)),
            r && (o = (d = t.parentNode) && w.test(d.nodeName || "")),
            (l = e.firesLoad || ("src" in t && (n || a || o))),
            (s = { target: t }),
            c(t, z.loadingClass),
            l && (clearTimeout(B), (B = p(ge, 2500)), E(t, le, !0)),
            o && A.call(d.getElementsByTagName("source"), ye),
            n
              ? t.setAttribute("srcset", n)
              : a &&
                !o &&
                (ee.test(t.nodeName)
                  ? ((i = a),
                    0 ==
                    (d =
                      (e = t).getAttribute("data-load-mode") ||
                      z.iframeLoadMode)
                      ? e.contentWindow.location.replace(i)
                      : 1 == d && (e.src = i))
                  : (t.src = a)),
            r && (n || o) && h(t, { src: a })),
            t._lazyRace && delete t._lazyRace,
            u(t, z.lazyClass),
            M(function () {
              var e = t.complete && 1 < t.naturalWidth;
              (l && !e) ||
                (e && c(t, z.fastLoadedClass),
                me(s),
                (t._lazyCache = !0),
                p(function () {
                  "_lazyCache" in t && delete t._lazyCache;
                }, 9)),
                "lazy" == t.loading && ie--;
            }, !0);
        })),
        (ue = I(function () {
          (z.loadMode = 3), oe();
        })),
        {
          _: function () {
            (T = n.now()),
              (g.elements = f.getElementsByClassName(z.lazyClass)),
              (H = f.getElementsByClassName(
                z.lazyClass + " " + z.preloadClass
              )),
              e("scroll", oe, !0),
              e("resize", oe, !0),
              e("pageshow", function (e) {
                var t;
                !e.persisted ||
                  ((t = f.querySelectorAll("." + z.loadingClass)).length &&
                    t.forEach &&
                    v(function () {
                      t.forEach(function (e) {
                        e.complete && ce(e);
                      });
                    }));
              }),
              i.MutationObserver
                ? new MutationObserver(oe).observe(m, {
                    childList: !0,
                    subtree: !0,
                    attributes: !0,
                  })
                : (m[d]("DOMNodeInserted", oe, !0),
                  m[d]("DOMAttrModified", oe, !0),
                  setInterval(oe, 999)),
              e("hashchange", oe, !0),
              [
                "focus",
                "mouseover",
                "click",
                "load",
                "transitionend",
                "animationend",
              ].forEach(function (e) {
                f[d](e, oe, !0);
              }),
              /d$|^c/.test(f.readyState)
                ? ve()
                : (e("load", ve), f[d]("DOMContentLoaded", oe), p(ve, 2e4)),
              g.elements.length ? (ze(), M._lsFlush()) : oe();
          },
          checkElems: (oe = function (e) {
            var t;
            (e = !0 === e) && (X = 33),
              K ||
                ((K = !0),
                (t = V - (n.now() - Q)) < 0 && (t = 0),
                e || t < 9 ? Y() : p(Y, t));
          }),
          unveil: (ce = function (e) {
            var t, a, i, r;
            e._lazyRace ||
              (((!(r =
                "auto" ==
                (i =
                  (a = Z.test(e.nodeName)) &&
                  (e[y](z.sizesAttr) || e[y]("sizes")))) &&
                O) ||
                !a ||
                (!e[y]("src") && !e.srcset) ||
                e.complete ||
                S(e, z.errorClass) ||
                !S(e, z.lazyClass)) &&
                ((t = x(e, "lazyunveilread").detail),
                r && Ce.updateElem(e, !0, e.offsetWidth),
                (e._lazyRace = !0),
                ie++,
                de(e, t, r, i, a)));
          }),
          _aLSL: pe,
        });
    function ge(e) {
      ie--, (e && !(ie < 0) && e.target) || (ie = 0);
    }
    function ze() {
      var e,
        t,
        a,
        i,
        r,
        n,
        o,
        s,
        l,
        d,
        c,
        u = g.elements;
      if ((R = z.loadMode) && ie < 8 && (e = u.length)) {
        for (t = 0, re++; t < e; t++)
          if (u[t] && !u[t]._lazyRace)
            if (!te || (g.prematureUnveil && g.prematureUnveil(u[t]))) ce(u[t]);
            else if (
              (((o = u[t][y]("data-expand")) && (r = +o)) || (r = ae),
              l ||
                ((l =
                  !z.expand || z.expand < 1
                    ? 500 < m.clientHeight && 500 < m.clientWidth
                      ? 500
                      : 370
                    : z.expand),
                (d = (g._defEx = l) * z.expFactor),
                (c = z.hFac),
                (U = null),
                ae < d && ie < 1 && 2 < re && 2 < R && !f.hidden
                  ? ((ae = d), (re = 0))
                  : (ae = 1 < R && 1 < re && ie < 6 ? l : 0)),
              s !== r &&
                ((q = innerWidth + r * c),
                (F = innerHeight + r),
                (n = -1 * r),
                (s = r)),
              (d = u[t].getBoundingClientRect()),
              ($ = d.bottom) >= n &&
                (J = d.top) <= F &&
                (D = d.right) >= n * c &&
                (P = d.left) <= q &&
                ($ || D || P || J) &&
                (z.loadHidden || ne(u[t])) &&
                ((O && ie < 3 && !o && (R < 3 || re < 4)) ||
                  (function (e, t) {
                    var a,
                      i = e,
                      r = ne(e);
                    for (
                      J -= t, $ += t, P -= t, D += t;
                      r && (i = i.offsetParent) && i != f.body && i != m;

                    )
                      (r = 0 < (L(i, "opacity") || 1)) &&
                        "visible" != L(i, "overflow") &&
                        ((a = i.getBoundingClientRect()),
                        (r =
                          D > a.left &&
                          P < a.right &&
                          $ > a.top - 1 &&
                          J < a.bottom + 1));
                    return r;
                  })(u[t], r)))
            ) {
              if ((ce(u[t]), (i = !0), 9 < ie)) break;
            } else
              !i &&
                O &&
                !a &&
                ie < 4 &&
                re < 4 &&
                2 < R &&
                (H[0] || z.preloadAfterLoad) &&
                (H[0] ||
                  (!o &&
                    ($ || D || P || J || "auto" != u[t][y](z.sizesAttr)))) &&
                (a = H[0] || u[t]);
        a && !i && ce(a);
      }
    }
    function he() {
      (K = !1), (Q = n.now()), G();
    }
    function me(e) {
      var t = e.target;
      t._lazyCache
        ? delete t._lazyCache
        : (ge(e),
          c(t, z.loadedClass),
          u(t, z.loadingClass),
          E(t, le),
          x(t, "lazyloaded"));
    }
    function ye(e) {
      var t,
        a = e[y](z.srcsetAttr);
      (t = z.customMedia[e[y]("data-media") || e[y]("media")]) &&
        e.setAttribute("media", t),
        a && e.setAttribute("srcset", a);
    }
    function pe() {
      3 == z.loadMode && (z.loadMode = 2), ue();
    }
    function ve() {
      O ||
        (n.now() - T < 999
          ? p(ve, 999)
          : ((O = !0), (z.loadMode = 3), oe(), e("scroll", pe, !0)));
    }
    var be,
      we,
      _e,
      Ce =
        ((we = j(function (e, t, a, i) {
          var r, n, o;
          if (
            ((e._lazysizesWidth = i),
            e.setAttribute("sizes", (i += "px")),
            w.test(t.nodeName || ""))
          )
            for (
              n = 0, o = (r = t.getElementsByTagName("source")).length;
              n < o;
              n++
            )
              r[n].setAttribute("sizes", i);
          a.detail.dataAttr || h(e, a.detail);
        })),
        {
          _: function () {
            (be = f.getElementsByClassName(z.autosizesClass)), e("resize", _e);
          },
          checkElems: (_e = I(function () {
            var e,
              t = be.length;
            if (t) for (e = 0; e < t; e++) Ae(be[e]);
          })),
          updateElem: Ae,
        });
    function Ae(e, t, a) {
      var i = e.parentNode;
      i &&
        ((a = N(e, i, a)),
        (t = x(e, "lazybeforesizes", { width: a, dataAttr: !!t }))
          .defaultPrevented ||
          ((a = t.detail.width) && a !== e._lazysizesWidth && we(e, i, t, a)));
    }
    function Se() {
      !Se.i && f.getElementsByClassName && ((Se.i = !0), Ce._(), fe._());
    }
    return (
      p(function () {
        z.init && Se();
      }),
      (g = {
        cfg: z,
        autoSizer: Ce,
        loader: fe,
        init: Se,
        uP: h,
        aC: c,
        rC: u,
        hC: S,
        fire: x,
        gW: N,
        rAF: M,
      })
    );
  });
