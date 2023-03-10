const mdChatClient="04A6B8B1EB8246BAB0231740EEE30DC6";


function movideskLogin(n) {
  mdInternalChatLoginData = n;
  var t = document.getElementById("md-chat-iframe");
  t ? executeLogin(t, mdInternalChatLoginData) : window.postMessage({action: "setIframe"}, "*")
}

function movideskChatWidgetChangeWindowState(n) {
  window.postMessage({action: "chatWidgetChangeWindowState", data: n}, "*")
}

function executeLogin(n, t) {
  var i = new Date, r, u, f, e;
  lastDate && (r = lastDate.setSeconds(lastDate.getSeconds() + 3), u = new Date(r), i < u) || (lastDate = i, f = n.contentWindow, e = {
    key: "executeLogin",
    value: t
  }, f.postMessage(e, "*"))
}

function __mdWrap(n, t) {
  try {
    t()
  } catch (i) {
    console.error("Chat Movidesk: ocorreu um erro ao invocar o mÃ©todo " + n)
  }
}

var MovideskChatUserStatus = {online: 1, offline: 2},
  ChatWidgetPosition = {leftSide: 1, centerPosition: 2, rightSide: 3}, ChatWidgetType = {chat: 1, knowledgeBase: 2},
  mdInternalChatLoginData, mdChatFrameHref = "Landing", mdChatCookieEmail = "", lastDate;
(function () {
  function s() {
    f(document).ready(function (n) {
      var d;
      n("<link rel='stylesheet' type='text/css' href='" + i + "/Content/css/chat-widget.min.css?v=10'>").appendTo("head");
      var f = a(n), u = f.wrapper, t = y(n, u), tt = t.widgetContainer, h = t.content, r = w(n, h), e = k(n),
        g = b(n, h), s = v(n, u, function (n) {
          n ? (r.loadIframes(), t.showWidget()) : t.hideWidget();
          c("chatWidgetWindowState", n)
        }), l = !1, nt = p(n, function (i) {
          if (!i.isActive) {
            u.hide();
            return
          }
          if (u.show(), localStorage.setItem("widgetType", i.type), !l) {
            l = !0;
            const t = (Number(i.distanceChatWidgetBottom) || 60) + 58, r = 130, u = t > r ? t : r;
            n('<style id="md-chat-widget-style">').prop("type", "text/css").html("#md-app-widget .chat-mv-color { background-color: " + i.backgroundColor + "; color: " + i.color + "; }#md-app-widget .chat-mv-color-text-only { color: " + i.color + "; }#md-app-widget .md-chat-widget-container { border-color: " + i.backgroundColor + "; max-height: calc(100vh - " + u + "px) }").appendTo("head");
            s.setButtonConfig(i)
          }
          f.updatePosition(i.chatWidgetPosition);
          f.setFooterDistance(i.distanceChatWidgetBottom);
          r.setHelloFrameText(i.helloHowAreYouResource, i.subtitle);
          r.setIframesToShow(i.type);
          t.setChatTypeClass(i.type);
          t.setLogoImage(i.logoUrl);
          e.updateNewMessage(i.newMessageResource)
        });
      (o("chatInConversation") === "1" || o("chatShowSatisfactionSurvey")) && t.setLoadingOverlay(!0);
      d = o("chatWidgetWindowState") === "true";
      s.changeState(d);
      window.addEventListener("message", function (n) {
        var u, i, f, o, h;
        n.data && n.data.action && (window.debugScript && console.debug("Chat Widget: iframe message", n.data), u = n.data.data || null, i = n.data.action, i === "chatWidgetChanged" ? nt.updateWidgetConfig() : i === "chatWidgetChangeWindowState" ? s.changeState(u === "maximized") : i === "startNotification" ? e.start() : i === "stopNotification" ? e.stop() : i === "chatInConversation" ? c("chatInConversation", u.chatInConversation) : i === "chatFrameHref" ? (mdChatFrameHref = u.currentHref, mdChatCookieEmail = u.cookieEmail, window.mdChatLoginData && window.mdChatLoginData.startChat && !mdInternalChatLoginData && (mdInternalChatLoginData = window.mdChatLoginData, window.mdChatLoginData = undefined), mdInternalChatLoginData && (f = document.getElementById("md-chat-iframe"), executeLogin(f, mdInternalChatLoginData), mdInternalChatLoginData = null)) : i === "maximizeChat" ? (r.maximizeChat(), t.setScroll(!1)) : i === "minimizeChat" ? (r.setChatFull(!1), t.setScroll(!0)) : i === "maximizeKb" ? (r.setKbFull(!0), t.setScroll(!1)) : i === "minimizeKb" ? (r.setKbFull(!1), t.setScroll(!0)) : i === "setIframeHeight" ? r.setIframeHeight(u) : i === "searchAgainKbArticleGoBack" ? r.kbIframe.get(0).contentWindow.postMessage({action: "searchAgainPlaceholder"}, "*") : i === "loadingOverlayStatus" ? t.setLoadingOverlay(u) : i === "movideskConfigIsReady" ? (t.setTitle(u.businessName), o = !u.chatUnleash.GR_17_ADICIONAR_LABEL_CLICAVEL_NO_CHAT || u.isMovideskBrand, o && g.loadCredits(u)) : i == "maximizeChatOrminimizeChat" && (h = localStorage.getItem("widgetType"), u && parseInt(h) !== ChatWidgetType.knowledgeBase ? (r.maximizeChat(), t.setScroll(!1)) : (r.setChatFull(!1), t.setScroll(!0))))
      })
    })
  }

  function a(n) {
    return function () {
      var t = n("<div class='md-chat-widget-wrapper' id='md-app-widget'>").appendTo("body").css("display", "none").css("opacity", "0"),
        i = function (n) {
          switch (n) {
            case ChatWidgetPosition.leftSide:
              t.removeClass("Center RightSide").addClass("LeftSide");
              break;
            case ChatWidgetPosition.centerPosition:
              t.removeClass("LeftSide RightSide").addClass("Center");
              break;
            default:
              t.removeClass("Center LeftSide").addClass("RightSide")
          }
        }, r = function (n) {
          t.css({bottom: n + "px"})
        };
      return {updatePosition: i, wrapper: t, setFooterDistance: r}
    }()
  }

  function v(n, i, f) {
    function e(t, i) {
      n.ajax({
        type: "GET", url: u + "/Content/img/ChatWidgetIcons/" + t, dataType: "text", success: function (n) {
          i(n)
        }
      })
    }

    var o = {
      1: "icon-smile.svg",
      2: "icon-kb-question.svg",
      3: "icon-kb-help.svg",
      4: "icon-kb-book.svg",
      5: "icon-kb-book2.svg"
    }, s = {1: "Simple", 2: "Square", 3: "Circle"};
    return function (i, u) {
      var l = n("<div class='md-chat-widget-btn-container'>"),
        f = n("<div class='md-chat-widget-btn-wrapper' />").on("click", function () {
          v(!c)
        }).appendTo(l), a;
      t(f);
      h(f);
      a = n("<div class='md-chat-widget-btn-close-icon md-chat-widget-icon-svg'>").appendTo(f);
      e("icon-collapse.svg", function (n) {
        a.html(n)
      });
      var c = !1, v = function (n) {
        c = n;
        var t = "md-chat-widget-btn-open", i = "md-chat-widget-btn-close";
        c ? f.addClass(i).removeClass(t) : f.addClass(t).removeClass(i);
        u(c)
      }, y = function (t) {
        e(o[t.icon], function (i) {
          var u = n("<div class='md-chat-widget-btn-icon md-chat-widget-icon-svg'>").html(i).appendTo(f);
          n("<div class='md-chat-widget-btn-title' />").text(t.title).insertAfter(u);
          f.attr("data-shape", s[t.iconShape || "Simple"]).attr("data-expanded", (t.appExpandedMode || !1).toString()).css("background-color", t.backgroundColor);
          f.find("svg").css("fill", t.backgroundColor);
          r(f)
        })
      };
      return l.appendTo(i), {changeState: v, isMaximized: c, setButtonConfig: y}
    }(i, f)
  }

  function y(n, i) {
    var f = u + "/Content/img/logo-white.png";
    return function () {
      var e = n("<div class='md-chat-widget-container chat-mv-color fancy-scroll'>").css("backgroundImage", "url(" + u + "/Content/img/chat_widget_background.svg)"),
        s = n('<div class="md-chat-widget fancy-scroll">'), o = n('<div class="md-chat-widget-header">'),
        c = n('<div class="md-chat-widget-title">'), l = n("<img class='md-chat-widget-logo'>"),
        a = function (n) {
          c.html(n);
          r(o)
        }, v = function (n) {
          e.removeClass("widget-type-kb widget-type-chat");
          switch (n) {
            case ChatWidgetType.knowledgeBase + ChatWidgetType.chat:
              e.addClass("widget-type-kb widget-type-chat");
              break;
            case ChatWidgetType.knowledgeBase:
              e.addClass("widget-type-kb");
              break;
            case ChatWidgetType.chat:
              e.addClass("widget-type-chat")
          }
        }, y = function (n) {
          l.attr("src", n || f)
        }, p = function (n) {
          n.appendTo(s)
        }, w = function () {
          e.removeClass("minimized");
          r(e)
        }, b = function () {
          e.addClass("minimized");
          h(e)
        }, k = function (n) {
          e.css("bottom", n + "px")
        }, d = function (n) {
          n ? e.addClass("is-loading") : e.removeClass("is-loading")
        }, g = function (n) {
          e.css("overflow", n ? "auto" : "hidden")
        };
      return t(e), t(o), l.appendTo(o), c.appendTo(o), o.appendTo(s), s.appendTo(e), e.appendTo(i), {
        widgetContainer: e,
        content: s,
        setChatTypeClass: v,
        setTitle: a,
        appendToContent: p,
        showWidget: w,
        hideWidget: b,
        setBottom: k,
        setLogoImage: y,
        setLoadingOverlay: d,
        setScroll: g
      }
    }()
  }

  function p(n, t) {
    return function () {
      var f = {
        backgroundColor: "#555",
        darkColor: "#333",
        color: "#FFF",
        chatOnline: !1,
        chatTitle: "Chat",
        newMessage: "..."
      }, r = {}, u = function () {
        n.ajax({
          url: i + "/ChatWidget/GetConfig",
          jsonp: "callback",
          jsonpCallback: "JSONPgetConfigCallback",
          dataType: "jsonp",
          cache: !0,
          data: {id: mdChatClient, format: "json"},
          success: function (i) {
            r = n.extend({}, f, i);
            t(r)
          },
          error: function () {
            console.error("Erro ao buscar a configuraÃ§Ã£o do widget do chat")
          }
        })
      };
      return u(), {updateWidgetConfig: u}
    }()
  }

  function w(n, u) {
    return function () {
      function s(n) {
        n.addClass("has-loaded");
        r(n)
      }

      var o = n("<div class='widget-frame' id='md-hello-iframe'>").append("<div class='md-hello-title' />").append("<div class='md-hello-desc' />"),
        e = n("<iframe class='widget-frame' id='md-chat-iframe'>"),
        f = n("<iframe class='widget-frame' id='md-kb-iframe'>"), v = function (n, t) {
          o.find(".md-hello-title").text(n);
          o.find(".md-hello-desc").text(t);
          setTimeout(function () {
            s(o)
          }, 150)
        }, c = function (n, t) {
          t ? n.addClass("is-fullscreen") : n.removeClass("is-fullscreen")
        }, l = function (n) {
          c(e, n)
        }, y = function (n) {
          c(f, n)
        }, p = function () {
          f.get(0).contentWindow.postMessage({action: "setCleanLabelKb"}, "*");
          l(!0)
        }, w = function (n) {
          var t = n.type === "chat" ? e : n.type === "kb" ? f : null;
          t && t.css("height", n.height)
        }, h = function (n, t) {
          for (var r, i = 0; i < n.length; i++) n[i].removeClass("hidden-frame");
          for (r = 0; r < t.length; r++) t[r].addClass("hidden-frame")
        }, b = function (n) {
          switch (n) {
            case ChatWidgetType.knowledgeBase + ChatWidgetType.chat:
              h([e, f], [o]);
              break;
            case ChatWidgetType.knowledgeBase:
              h([o, f], [e]);
              break;
            case ChatWidgetType.chat:
            default:
              h([e], [o, f])
          }
        }, a = !1, k = function () {
          if (!a) {
            a = !0;
            e.attr("src", i + "/ChatWidget/" + mdChatFrameHref + "/" + mdChatClient).on("load", function () {
              s(e)
            });
            f.attr("src", i + "/KbChatWidget/Index?id=" + mdChatClient).on("load", function () {
              s(f)
            })
          }
        };
      return t(o), t(e), t(f), o.appendTo(u), e.appendTo(u), f.appendTo(u), {
        kbIframe: f,
        chatIframe: e,
        loadIframes: k,
        maximizeChat: p,
        setChatFull: l,
        setKbFull: y,
        setIframeHeight: w,
        setIframesToShow: b,
        setHelloFrameText: v
      }
    }()
  }

  function b(n, i) {
    return function () {
      var f = n("<div class='md-chat-widget-credits-container'>"), e = !1, o = function (t) {
        var i, o, s;
        e || (e = !0, i = t.externalSite || "#", t.chatUnleash.GR_17_ADICIONAR_LABEL_CLICAVEL_NO_CHAT || (i = "https://www.movidesk.com/conheca-o-movidesk"), o = u + "/Content/img/logo-small-subtle.svg", s = "<img class='white-credits' src='" + o + "' />", n('<a class="link-chat-credits">').attr("rel", "nofollow").attr("target", "__blank").attr("href", i).html(t.resources.PoweredBy + s).on("load", function () {
          r(f)
        }).appendTo(f))
      };
      return t(f), i.append(f), {loadCredits: o}
    }()
  }

  function k() {
    return function () {
      var n = null, r = document.title, t = null, i = function (n) {
        document.title = n && t ? t : r
      }, u = function () {
        n && clearInterval(n);
        i(!1)
      }, f = function () {
        var t = !1;
        n = setInterval(function () {
          t = !t;
          i(t)
        }, 1e3)
      }, e = function (n) {
        t = n
      };
      return {start: f, stop: u, updateNewMessage: e}
    }()
  }

  function t(n) {
    n.addClass("md-fade-when-visible")
  }

  function r(n) {
    n.addClass("md-fade-to-visible").removeClass("md-fade-to-invisible")
  }

  function h(n) {
    n.addClass("md-fade-to-invisible").removeClass("md-fade-to-visible")
  }

  function d(n, t, i) {
    var u = n + "=" + t + "; path=/; Secure", r;
    i && (r = new Date, r.setTime(r.getTime() + i * 864e5), u += "; expires=" + r.toUTCString());
    document.cookie = u
  }

  function g(n) {
    for (var t, r = n + "=", u = document.cookie.split(";"), i = 0; i < u.length; i++) {
      for (t = u[i]; t.charAt(0) == " ";) t = t.substring(1);
      if (t.indexOf(r) == 0) return t.substring(r.length, t.length)
    }
    return ""
  }

  function o(n) {
    return g(n + mdChatClient)
  }

  function c(n, t, i) {
    return d(n + mdChatClient, t, i)
  }

  var f, e, n;
  if (!mdChatClient) {
    console.error("Invalid code");
    return
  }
  var i = window.mdChatApiUrl || "https://chat.movidesk.com",
    u = window.mdPrivateNetwork ? i : "https://cdn.app.movidesk.com",
    l = window.mdPrivateNetwork ? i + "/Scripts/jquery-2.2.2.min.js" : "https://code.jquery.com/jquery-3.6.0.min.js";
  (window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""))).replace("file://", "https://");
  window.jQuery === undefined || window.jQuery.fn.jquery !== "3.6.0" ? (e = function () {
    f = window.jQuery.noConflict(!0);
    s()
  }, n = document.createElement("script"), n.setAttribute("type", "text/javascript"), n.setAttribute("src", l), n.readyState ? n.onreadystatechange = function () {
    (this.readyState === "complete" || this.readyState === "loaded") && e()
  } : n.onload = e, (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(n)) : (f = window.jQuery, s())
})();
window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : ""));
window.movideskChatWidget = {
  show: function () {
    __mdWrap("show", function () {
      document.getElementById("md-app-widget").style.display = "block"
    })
  }, hide: function () {
    __mdWrap("hide", function () {
      document.getElementById("md-app-widget").style.display = "none"
    })
  }, maximize: function () {
    __mdWrap("maximize", function () {
      movideskChatWidgetChangeWindowState("maximized")
    })
  }, minimize: function () {
    __mdWrap("minimize", function () {
      movideskChatWidgetChangeWindowState("minimized")
    })
  }, login: function (n) {
    __mdWrap("login", function () {
      movideskLogin(n)
    })
  }
};
/**************/
