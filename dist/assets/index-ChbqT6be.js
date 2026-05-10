var e = (e, t) => () => (e && (t = e((e = 0))), t),
  t = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports);
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes)
          e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === `use-credentials`
        ? (t.credentials = `include`)
        : e.crossOrigin === `anonymous`
          ? (t.credentials = `omit`)
          : (t.credentials = `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var n = t((e, t) => {
  (function (n, r) {
    typeof e == `object` && t !== void 0
      ? (t.exports = r())
      : typeof define == `function` && define.amd
        ? define(r)
        : ((n = typeof globalThis < `u` ? globalThis : n || self),
          (n.bootstrap = r()));
  })(e, function () {
    let e = new Map(),
      t = {
        set(t, n, r) {
          e.has(t) || e.set(t, new Map());
          let i = e.get(t);
          if (!i.has(n) && i.size !== 0) {
            console.error(
              `Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(i.keys())[0]}.`
            );
            return;
          }
          i.set(n, r);
        },
        get(t, n) {
          return (e.has(t) && e.get(t).get(n)) || null;
        },
        remove(t, n) {
          if (!e.has(t)) return;
          let r = e.get(t);
          (r.delete(n), r.size === 0 && e.delete(t));
        },
      },
      n = `transitionend`,
      r = (e) => (
        e &&
          window.CSS &&
          window.CSS.escape &&
          (e = e.replace(/#([^\s"#']+)/g, (e, t) => `#${CSS.escape(t)}`)),
        e
      ),
      i = (e) =>
        e == null
          ? `${e}`
          : Object.prototype.toString
              .call(e)
              .match(/\s([a-z]+)/i)[1]
              .toLowerCase(),
      a = (e) => {
        do e += Math.floor(Math.random() * 1e6);
        while (document.getElementById(e));
        return e;
      },
      o = (e) => {
        if (!e) return 0;
        let { transitionDuration: t, transitionDelay: n } =
          window.getComputedStyle(e);
        return !Number.parseFloat(t) && !Number.parseFloat(n)
          ? 0
          : ((t = t.split(`,`)[0]),
            (n = n.split(`,`)[0]),
            (Number.parseFloat(t) + Number.parseFloat(n)) * 1e3);
      },
      s = (e) => {
        e.dispatchEvent(new Event(n));
      },
      c = (e) =>
        !e || typeof e != `object`
          ? !1
          : (e.jquery !== void 0 && (e = e[0]), e.nodeType !== void 0),
      l = (e) =>
        c(e)
          ? e.jquery
            ? e[0]
            : e
          : typeof e == `string` && e.length > 0
            ? document.querySelector(r(e))
            : null,
      u = (e) => {
        if (!c(e) || e.getClientRects().length === 0) return !1;
        let t =
            getComputedStyle(e).getPropertyValue(`visibility`) === `visible`,
          n = e.closest(`details:not([open])`);
        if (!n) return t;
        if (n !== e) {
          let t = e.closest(`summary`);
          if ((t && t.parentNode !== n) || t === null) return !1;
        }
        return t;
      },
      d = (e) =>
        !e ||
        e.nodeType !== Node.ELEMENT_NODE ||
        e.classList.contains(`disabled`)
          ? !0
          : e.disabled === void 0
            ? e.hasAttribute(`disabled`) &&
              e.getAttribute(`disabled`) !== `false`
            : e.disabled,
      f = (e) => {
        if (!document.documentElement.attachShadow) return null;
        if (typeof e.getRootNode == `function`) {
          let t = e.getRootNode();
          return t instanceof ShadowRoot ? t : null;
        }
        return e instanceof ShadowRoot
          ? e
          : e.parentNode
            ? f(e.parentNode)
            : null;
      },
      p = () => {},
      m = (e) => {
        e.offsetHeight;
      },
      h = () =>
        window.jQuery && !document.body.hasAttribute(`data-bs-no-jquery`)
          ? window.jQuery
          : null,
      g = [],
      _ = (e) => {
        document.readyState === `loading`
          ? (g.length ||
              document.addEventListener(`DOMContentLoaded`, () => {
                for (let e of g) e();
              }),
            g.push(e))
          : e();
      },
      v = () => document.documentElement.dir === `rtl`,
      y = (e) => {
        _(() => {
          let t = h();
          if (t) {
            let n = e.NAME,
              r = t.fn[n];
            ((t.fn[n] = e.jQueryInterface),
              (t.fn[n].Constructor = e),
              (t.fn[n].noConflict = () => ((t.fn[n] = r), e.jQueryInterface)));
          }
        });
      },
      b = (e, t = [], n = e) => (typeof e == `function` ? e.call(...t) : n),
      x = (e, t, r = !0) => {
        if (!r) {
          b(e);
          return;
        }
        let i = o(t) + 5,
          a = !1,
          c = ({ target: r }) => {
            r === t && ((a = !0), t.removeEventListener(n, c), b(e));
          };
        (t.addEventListener(n, c),
          setTimeout(() => {
            a || s(t);
          }, i));
      },
      S = (e, t, n, r) => {
        let i = e.length,
          a = e.indexOf(t);
        return a === -1
          ? !n && r
            ? e[i - 1]
            : e[0]
          : ((a += n ? 1 : -1),
            r && (a = (a + i) % i),
            e[Math.max(0, Math.min(a, i - 1))]);
      },
      C = /[^.]*(?=\..*)\.|.*/,
      w = /\..*/,
      T = /::\d+$/,
      E = {},
      D = 1,
      O = { mouseenter: `mouseover`, mouseleave: `mouseout` },
      k = new Set(
        `click.dblclick.mouseup.mousedown.contextmenu.mousewheel.DOMMouseScroll.mouseover.mouseout.mousemove.selectstart.selectend.keydown.keypress.keyup.orientationchange.touchstart.touchmove.touchend.touchcancel.pointerdown.pointermove.pointerup.pointerleave.pointercancel.gesturestart.gesturechange.gestureend.focus.blur.change.reset.select.submit.focusin.focusout.load.unload.beforeunload.resize.move.DOMContentLoaded.readystatechange.error.abort.scroll`.split(
          `.`
        )
      );
    function ee(e, t) {
      return (t && `${t}::${D++}`) || e.uidEvent || D++;
    }
    function A(e) {
      let t = ee(e);
      return ((e.uidEvent = t), (E[t] = E[t] || {}), E[t]);
    }
    function j(e, t) {
      return function n(r) {
        return (
          se(r, { delegateTarget: e }),
          n.oneOff && N.off(e, r.type, t),
          t.apply(e, [r])
        );
      };
    }
    function te(e, t, n) {
      return function r(i) {
        let a = e.querySelectorAll(t);
        for (let { target: o } = i; o && o !== this; o = o.parentNode)
          for (let s of a)
            if (s === o)
              return (
                se(i, { delegateTarget: o }),
                r.oneOff && N.off(e, i.type, t, n),
                n.apply(o, [i])
              );
      };
    }
    function M(e, t, n = null) {
      return Object.values(e).find(
        (e) => e.callable === t && e.delegationSelector === n
      );
    }
    function ne(e, t, n) {
      let r = typeof t == `string`,
        i = r ? n : t || n,
        a = oe(e);
      return (k.has(a) || (a = e), [r, i, a]);
    }
    function re(e, t, n, r, i) {
      if (typeof t != `string` || !e) return;
      let [a, o, s] = ne(t, n, r);
      t in O &&
        (o = ((e) =>
          function (t) {
            if (
              !t.relatedTarget ||
              (t.relatedTarget !== t.delegateTarget &&
                !t.delegateTarget.contains(t.relatedTarget))
            )
              return e.call(this, t);
          })(o));
      let c = A(e),
        l = c[s] || (c[s] = {}),
        u = M(l, o, a ? n : null);
      if (u) {
        u.oneOff = u.oneOff && i;
        return;
      }
      let d = ee(o, t.replace(C, ``)),
        f = a ? te(e, n, o) : j(e, o);
      ((f.delegationSelector = a ? n : null),
        (f.callable = o),
        (f.oneOff = i),
        (f.uidEvent = d),
        (l[d] = f),
        e.addEventListener(s, f, a));
    }
    function ie(e, t, n, r, i) {
      let a = M(t[n], r, i);
      a && (e.removeEventListener(n, a, !!i), delete t[n][a.uidEvent]);
    }
    function ae(e, t, n, r) {
      let i = t[n] || {};
      for (let [a, o] of Object.entries(i))
        a.includes(r) && ie(e, t, n, o.callable, o.delegationSelector);
    }
    function oe(e) {
      return ((e = e.replace(w, ``)), O[e] || e);
    }
    let N = {
      on(e, t, n, r) {
        re(e, t, n, r, !1);
      },
      one(e, t, n, r) {
        re(e, t, n, r, !0);
      },
      off(e, t, n, r) {
        if (typeof t != `string` || !e) return;
        let [i, a, o] = ne(t, n, r),
          s = o !== t,
          c = A(e),
          l = c[o] || {},
          u = t.startsWith(`.`);
        if (a !== void 0) {
          if (!Object.keys(l).length) return;
          ie(e, c, o, a, i ? n : null);
          return;
        }
        if (u) for (let n of Object.keys(c)) ae(e, c, n, t.slice(1));
        for (let [n, r] of Object.entries(l)) {
          let i = n.replace(T, ``);
          (!s || t.includes(i)) &&
            ie(e, c, o, r.callable, r.delegationSelector);
        }
      },
      trigger(e, t, n) {
        if (typeof t != `string` || !e) return null;
        let r = h(),
          i = t !== oe(t),
          a = null,
          o = !0,
          s = !0,
          c = !1;
        i &&
          r &&
          ((a = r.Event(t, n)),
          r(e).trigger(a),
          (o = !a.isPropagationStopped()),
          (s = !a.isImmediatePropagationStopped()),
          (c = a.isDefaultPrevented()));
        let l = se(new Event(t, { bubbles: o, cancelable: !0 }), n);
        return (
          c && l.preventDefault(),
          s && e.dispatchEvent(l),
          l.defaultPrevented && a && a.preventDefault(),
          l
        );
      },
    };
    function se(e, t = {}) {
      for (let [n, r] of Object.entries(t))
        try {
          e[n] = r;
        } catch {
          Object.defineProperty(e, n, {
            configurable: !0,
            get() {
              return r;
            },
          });
        }
      return e;
    }
    function ce(e) {
      if (e === `true`) return !0;
      if (e === `false`) return !1;
      if (e === Number(e).toString()) return Number(e);
      if (e === `` || e === `null`) return null;
      if (typeof e != `string`) return e;
      try {
        return JSON.parse(decodeURIComponent(e));
      } catch {
        return e;
      }
    }
    function le(e) {
      return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
    }
    let P = {
      setDataAttribute(e, t, n) {
        e.setAttribute(`data-bs-${le(t)}`, n);
      },
      removeDataAttribute(e, t) {
        e.removeAttribute(`data-bs-${le(t)}`);
      },
      getDataAttributes(e) {
        if (!e) return {};
        let t = {},
          n = Object.keys(e.dataset).filter(
            (e) => e.startsWith(`bs`) && !e.startsWith(`bsConfig`)
          );
        for (let r of n) {
          let n = r.replace(/^bs/, ``);
          ((n = n.charAt(0).toLowerCase() + n.slice(1)),
            (t[n] = ce(e.dataset[r])));
        }
        return t;
      },
      getDataAttribute(e, t) {
        return ce(e.getAttribute(`data-bs-${le(t)}`));
      },
    };
    class ue {
      static get Default() {
        return {};
      }
      static get DefaultType() {
        return {};
      }
      static get NAME() {
        throw Error(
          `You have to implement the static method "NAME", for each component!`
        );
      }
      _getConfig(e) {
        return (
          (e = this._mergeConfigObj(e)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      _configAfterMerge(e) {
        return e;
      }
      _mergeConfigObj(e, t) {
        let n = c(t) ? P.getDataAttribute(t, `config`) : {};
        return {
          ...this.constructor.Default,
          ...(typeof n == `object` ? n : {}),
          ...(c(t) ? P.getDataAttributes(t) : {}),
          ...(typeof e == `object` ? e : {}),
        };
      }
      _typeCheckConfig(e, t = this.constructor.DefaultType) {
        for (let [n, r] of Object.entries(t)) {
          let t = e[n],
            a = c(t) ? `element` : i(t);
          if (!new RegExp(r).test(a))
            throw TypeError(
              `${this.constructor.NAME.toUpperCase()}: Option "${n}" provided type "${a}" but expected type "${r}".`
            );
        }
      }
    }
    class F extends ue {
      constructor(e, n) {
        (super(),
          (e = l(e)),
          e &&
            ((this._element = e),
            (this._config = this._getConfig(n)),
            t.set(this._element, this.constructor.DATA_KEY, this)));
      }
      dispose() {
        (t.remove(this._element, this.constructor.DATA_KEY),
          N.off(this._element, this.constructor.EVENT_KEY));
        for (let e of Object.getOwnPropertyNames(this)) this[e] = null;
      }
      _queueCallback(e, t, n = !0) {
        x(e, t, n);
      }
      _getConfig(e) {
        return (
          (e = this._mergeConfigObj(e, this._element)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      static getInstance(e) {
        return t.get(l(e), this.DATA_KEY);
      }
      static getOrCreateInstance(e, t = {}) {
        return (
          this.getInstance(e) || new this(e, typeof t == `object` ? t : null)
        );
      }
      static get VERSION() {
        return `5.3.8`;
      }
      static get DATA_KEY() {
        return `bs.${this.NAME}`;
      }
      static get EVENT_KEY() {
        return `.${this.DATA_KEY}`;
      }
      static eventName(e) {
        return `${e}${this.EVENT_KEY}`;
      }
    }
    let de = (e) => {
        let t = e.getAttribute(`data-bs-target`);
        if (!t || t === `#`) {
          let n = e.getAttribute(`href`);
          if (!n || (!n.includes(`#`) && !n.startsWith(`.`))) return null;
          (n.includes(`#`) && !n.startsWith(`#`) && (n = `#${n.split(`#`)[1]}`),
            (t = n && n !== `#` ? n.trim() : null));
        }
        return t
          ? t
              .split(`,`)
              .map((e) => r(e))
              .join(`,`)
          : null;
      },
      I = {
        find(e, t = document.documentElement) {
          return [].concat(...Element.prototype.querySelectorAll.call(t, e));
        },
        findOne(e, t = document.documentElement) {
          return Element.prototype.querySelector.call(t, e);
        },
        children(e, t) {
          return [].concat(...e.children).filter((e) => e.matches(t));
        },
        parents(e, t) {
          let n = [],
            r = e.parentNode.closest(t);
          for (; r; ) (n.push(r), (r = r.parentNode.closest(t)));
          return n;
        },
        prev(e, t) {
          let n = e.previousElementSibling;
          for (; n; ) {
            if (n.matches(t)) return [n];
            n = n.previousElementSibling;
          }
          return [];
        },
        next(e, t) {
          let n = e.nextElementSibling;
          for (; n; ) {
            if (n.matches(t)) return [n];
            n = n.nextElementSibling;
          }
          return [];
        },
        focusableChildren(e) {
          let t = [
            `a`,
            `button`,
            `input`,
            `textarea`,
            `select`,
            `details`,
            `[tabindex]`,
            `[contenteditable="true"]`,
          ]
            .map((e) => `${e}:not([tabindex^="-"])`)
            .join(`,`);
          return this.find(t, e).filter((e) => !d(e) && u(e));
        },
        getSelectorFromElement(e) {
          let t = de(e);
          return t && I.findOne(t) ? t : null;
        },
        getElementFromSelector(e) {
          let t = de(e);
          return t ? I.findOne(t) : null;
        },
        getMultipleElementsFromSelector(e) {
          let t = de(e);
          return t ? I.find(t) : [];
        },
      },
      fe = (e, t = `hide`) => {
        let n = `click.dismiss${e.EVENT_KEY}`,
          r = e.NAME;
        N.on(document, n, `[data-bs-dismiss="${r}"]`, function (n) {
          if (
            ([`A`, `AREA`].includes(this.tagName) && n.preventDefault(),
            d(this))
          )
            return;
          let i = I.getElementFromSelector(this) || this.closest(`.${r}`);
          e.getOrCreateInstance(i)[t]();
        });
      },
      pe = `.bs.alert`,
      me = `close${pe}`,
      he = `closed${pe}`;
    class ge extends F {
      static get NAME() {
        return `alert`;
      }
      close() {
        if (N.trigger(this._element, me).defaultPrevented) return;
        this._element.classList.remove(`show`);
        let e = this._element.classList.contains(`fade`);
        this._queueCallback(() => this._destroyElement(), this._element, e);
      }
      _destroyElement() {
        (this._element.remove(), N.trigger(this._element, he), this.dispose());
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = ge.getOrCreateInstance(this);
          if (typeof e == `string`) {
            if (t[e] === void 0 || e.startsWith(`_`) || e === `constructor`)
              throw TypeError(`No method named "${e}"`);
            t[e](this);
          }
        });
      }
    }
    (fe(ge, `close`), y(ge));
    let L = `[data-bs-toggle="button"]`;
    class R extends F {
      static get NAME() {
        return `button`;
      }
      toggle() {
        this._element.setAttribute(
          `aria-pressed`,
          this._element.classList.toggle(`active`)
        );
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = R.getOrCreateInstance(this);
          e === `toggle` && t[e]();
        });
      }
    }
    (N.on(document, `click.bs.button.data-api`, L, (e) => {
      e.preventDefault();
      let t = e.target.closest(L);
      R.getOrCreateInstance(t).toggle();
    }),
      y(R));
    let z = `.bs.swipe`,
      _e = `touchstart${z}`,
      ve = `touchmove${z}`,
      ye = `touchend${z}`,
      be = `pointerdown${z}`,
      xe = `pointerup${z}`,
      Se = { endCallback: null, leftCallback: null, rightCallback: null },
      Ce = {
        endCallback: `(function|null)`,
        leftCallback: `(function|null)`,
        rightCallback: `(function|null)`,
      };
    class we extends ue {
      constructor(e, t) {
        (super(),
          (this._element = e),
          !(!e || !we.isSupported()) &&
            ((this._config = this._getConfig(t)),
            (this._deltaX = 0),
            (this._supportPointerEvents = !!window.PointerEvent),
            this._initEvents()));
      }
      static get Default() {
        return Se;
      }
      static get DefaultType() {
        return Ce;
      }
      static get NAME() {
        return `swipe`;
      }
      dispose() {
        N.off(this._element, z);
      }
      _start(e) {
        if (!this._supportPointerEvents) {
          this._deltaX = e.touches[0].clientX;
          return;
        }
        this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX);
      }
      _end(e) {
        (this._eventIsPointerPenTouch(e) &&
          (this._deltaX = e.clientX - this._deltaX),
          this._handleSwipe(),
          b(this._config.endCallback));
      }
      _move(e) {
        this._deltaX =
          e.touches && e.touches.length > 1
            ? 0
            : e.touches[0].clientX - this._deltaX;
      }
      _handleSwipe() {
        let e = Math.abs(this._deltaX);
        if (e <= 40) return;
        let t = e / this._deltaX;
        ((this._deltaX = 0),
          t &&
            b(t > 0 ? this._config.rightCallback : this._config.leftCallback));
      }
      _initEvents() {
        this._supportPointerEvents
          ? (N.on(this._element, be, (e) => this._start(e)),
            N.on(this._element, xe, (e) => this._end(e)),
            this._element.classList.add(`pointer-event`))
          : (N.on(this._element, _e, (e) => this._start(e)),
            N.on(this._element, ve, (e) => this._move(e)),
            N.on(this._element, ye, (e) => this._end(e)));
      }
      _eventIsPointerPenTouch(e) {
        return (
          this._supportPointerEvents &&
          (e.pointerType === `pen` || e.pointerType === `touch`)
        );
      }
      static isSupported() {
        return (
          `ontouchstart` in document.documentElement ||
          navigator.maxTouchPoints > 0
        );
      }
    }
    let Te = `.bs.carousel`,
      Ee = `.data-api`,
      De = `next`,
      Oe = `prev`,
      ke = `left`,
      Ae = `right`,
      je = `slide${Te}`,
      Me = `slid${Te}`,
      Ne = `keydown${Te}`,
      Pe = `mouseenter${Te}`,
      Fe = `mouseleave${Te}`,
      Ie = `dragstart${Te}`,
      Le = `load${Te}${Ee}`,
      Re = `click${Te}${Ee}`,
      ze = `carousel`,
      Be = `active`,
      Ve = `.active`,
      He = `.carousel-item`,
      Ue = Ve + He,
      We = { ArrowLeft: Ae, ArrowRight: ke },
      Ge = {
        interval: 5e3,
        keyboard: !0,
        pause: `hover`,
        ride: !1,
        touch: !0,
        wrap: !0,
      },
      Ke = {
        interval: `(number|boolean)`,
        keyboard: `boolean`,
        pause: `(string|boolean)`,
        ride: `(boolean|string)`,
        touch: `boolean`,
        wrap: `boolean`,
      };
    class qe extends F {
      constructor(e, t) {
        (super(e, t),
          (this._interval = null),
          (this._activeElement = null),
          (this._isSliding = !1),
          (this.touchTimeout = null),
          (this._swipeHelper = null),
          (this._indicatorsElement = I.findOne(
            `.carousel-indicators`,
            this._element
          )),
          this._addEventListeners(),
          this._config.ride === ze && this.cycle());
      }
      static get Default() {
        return Ge;
      }
      static get DefaultType() {
        return Ke;
      }
      static get NAME() {
        return `carousel`;
      }
      next() {
        this._slide(De);
      }
      nextWhenVisible() {
        !document.hidden && u(this._element) && this.next();
      }
      prev() {
        this._slide(Oe);
      }
      pause() {
        (this._isSliding && s(this._element), this._clearInterval());
      }
      cycle() {
        (this._clearInterval(),
          this._updateInterval(),
          (this._interval = setInterval(
            () => this.nextWhenVisible(),
            this._config.interval
          )));
      }
      _maybeEnableCycle() {
        if (this._config.ride) {
          if (this._isSliding) {
            N.one(this._element, Me, () => this.cycle());
            return;
          }
          this.cycle();
        }
      }
      to(e) {
        let t = this._getItems();
        if (e > t.length - 1 || e < 0) return;
        if (this._isSliding) {
          N.one(this._element, Me, () => this.to(e));
          return;
        }
        let n = this._getItemIndex(this._getActive());
        if (n === e) return;
        let r = e > n ? De : Oe;
        this._slide(r, t[e]);
      }
      dispose() {
        (this._swipeHelper && this._swipeHelper.dispose(), super.dispose());
      }
      _configAfterMerge(e) {
        return ((e.defaultInterval = e.interval), e);
      }
      _addEventListeners() {
        (this._config.keyboard &&
          N.on(this._element, Ne, (e) => this._keydown(e)),
          this._config.pause === `hover` &&
            (N.on(this._element, Pe, () => this.pause()),
            N.on(this._element, Fe, () => this._maybeEnableCycle())),
          this._config.touch &&
            we.isSupported() &&
            this._addTouchEventListeners());
      }
      _addTouchEventListeners() {
        for (let e of I.find(`.carousel-item img`, this._element))
          N.on(e, Ie, (e) => e.preventDefault());
        this._swipeHelper = new we(this._element, {
          leftCallback: () => this._slide(this._directionToOrder(ke)),
          rightCallback: () => this._slide(this._directionToOrder(Ae)),
          endCallback: () => {
            this._config.pause === `hover` &&
              (this.pause(),
              this.touchTimeout && clearTimeout(this.touchTimeout),
              (this.touchTimeout = setTimeout(
                () => this._maybeEnableCycle(),
                500 + this._config.interval
              )));
          },
        });
      }
      _keydown(e) {
        if (/input|textarea/i.test(e.target.tagName)) return;
        let t = We[e.key];
        t && (e.preventDefault(), this._slide(this._directionToOrder(t)));
      }
      _getItemIndex(e) {
        return this._getItems().indexOf(e);
      }
      _setActiveIndicatorElement(e) {
        if (!this._indicatorsElement) return;
        let t = I.findOne(Ve, this._indicatorsElement);
        (t.classList.remove(Be), t.removeAttribute(`aria-current`));
        let n = I.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement);
        n && (n.classList.add(Be), n.setAttribute(`aria-current`, `true`));
      }
      _updateInterval() {
        let e = this._activeElement || this._getActive();
        if (!e) return;
        let t = Number.parseInt(e.getAttribute(`data-bs-interval`), 10);
        this._config.interval = t || this._config.defaultInterval;
      }
      _slide(e, t = null) {
        if (this._isSliding) return;
        let n = this._getActive(),
          r = e === De,
          i = t || S(this._getItems(), n, r, this._config.wrap);
        if (i === n) return;
        let a = this._getItemIndex(i),
          o = (t) =>
            N.trigger(this._element, t, {
              relatedTarget: i,
              direction: this._orderToDirection(e),
              from: this._getItemIndex(n),
              to: a,
            });
        if (o(je).defaultPrevented || !n || !i) return;
        let s = !!this._interval;
        (this.pause(),
          (this._isSliding = !0),
          this._setActiveIndicatorElement(a),
          (this._activeElement = i));
        let c = r ? `carousel-item-start` : `carousel-item-end`,
          l = r ? `carousel-item-next` : `carousel-item-prev`;
        (i.classList.add(l),
          m(i),
          n.classList.add(c),
          i.classList.add(c),
          this._queueCallback(
            () => {
              (i.classList.remove(c, l),
                i.classList.add(Be),
                n.classList.remove(Be, l, c),
                (this._isSliding = !1),
                o(Me));
            },
            n,
            this._isAnimated()
          ),
          s && this.cycle());
      }
      _isAnimated() {
        return this._element.classList.contains(`slide`);
      }
      _getActive() {
        return I.findOne(Ue, this._element);
      }
      _getItems() {
        return I.find(He, this._element);
      }
      _clearInterval() {
        this._interval &&= (clearInterval(this._interval), null);
      }
      _directionToOrder(e) {
        return v() ? (e === ke ? Oe : De) : e === ke ? De : Oe;
      }
      _orderToDirection(e) {
        return v() ? (e === Oe ? ke : Ae) : e === Oe ? Ae : ke;
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = qe.getOrCreateInstance(this, e);
          if (typeof e == `number`) {
            t.to(e);
            return;
          }
          if (typeof e == `string`) {
            if (t[e] === void 0 || e.startsWith(`_`) || e === `constructor`)
              throw TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    (N.on(document, Re, `[data-bs-slide], [data-bs-slide-to]`, function (e) {
      let t = I.getElementFromSelector(this);
      if (!t || !t.classList.contains(ze)) return;
      e.preventDefault();
      let n = qe.getOrCreateInstance(t),
        r = this.getAttribute(`data-bs-slide-to`);
      if (r) {
        (n.to(r), n._maybeEnableCycle());
        return;
      }
      if (P.getDataAttribute(this, `slide`) === `next`) {
        (n.next(), n._maybeEnableCycle());
        return;
      }
      (n.prev(), n._maybeEnableCycle());
    }),
      N.on(window, Le, () => {
        let e = I.find(`[data-bs-ride="carousel"]`);
        for (let t of e) qe.getOrCreateInstance(t);
      }),
      y(qe));
    let Je = `.bs.collapse`,
      Ye = `show${Je}`,
      Xe = `shown${Je}`,
      Ze = `hide${Je}`,
      Qe = `hidden${Je}`,
      $e = `click${Je}.data-api`,
      et = `show`,
      tt = `collapse`,
      nt = `collapsing`,
      rt = `:scope .${tt} .${tt}`,
      it = `[data-bs-toggle="collapse"]`,
      at = { parent: null, toggle: !0 },
      ot = { parent: `(null|element)`, toggle: `boolean` };
    class st extends F {
      constructor(e, t) {
        (super(e, t), (this._isTransitioning = !1), (this._triggerArray = []));
        let n = I.find(it);
        for (let e of n) {
          let t = I.getSelectorFromElement(e),
            n = I.find(t).filter((e) => e === this._element);
          t !== null && n.length && this._triggerArray.push(e);
        }
        (this._initializeChildren(),
          this._config.parent ||
            this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()),
          this._config.toggle && this.toggle());
      }
      static get Default() {
        return at;
      }
      static get DefaultType() {
        return ot;
      }
      static get NAME() {
        return `collapse`;
      }
      toggle() {
        this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (this._isTransitioning || this._isShown()) return;
        let e = [];
        if (
          (this._config.parent &&
            (e = this._getFirstLevelChildren(
              `.collapse.show, .collapse.collapsing`
            )
              .filter((e) => e !== this._element)
              .map((e) => st.getOrCreateInstance(e, { toggle: !1 }))),
          (e.length && e[0]._isTransitioning) ||
            N.trigger(this._element, Ye).defaultPrevented)
        )
          return;
        for (let t of e) t.hide();
        let t = this._getDimension();
        (this._element.classList.remove(tt),
          this._element.classList.add(nt),
          (this._element.style[t] = 0),
          this._addAriaAndCollapsedClass(this._triggerArray, !0),
          (this._isTransitioning = !0));
        let n = () => {
            ((this._isTransitioning = !1),
              this._element.classList.remove(nt),
              this._element.classList.add(tt, et),
              (this._element.style[t] = ``),
              N.trigger(this._element, Xe));
          },
          r = `scroll${t[0].toUpperCase() + t.slice(1)}`;
        (this._queueCallback(n, this._element, !0),
          (this._element.style[t] = `${this._element[r]}px`));
      }
      hide() {
        if (
          this._isTransitioning ||
          !this._isShown() ||
          N.trigger(this._element, Ze).defaultPrevented
        )
          return;
        let e = this._getDimension();
        ((this._element.style[e] =
          `${this._element.getBoundingClientRect()[e]}px`),
          m(this._element),
          this._element.classList.add(nt),
          this._element.classList.remove(tt, et));
        for (let e of this._triggerArray) {
          let t = I.getElementFromSelector(e);
          t && !this._isShown(t) && this._addAriaAndCollapsedClass([e], !1);
        }
        this._isTransitioning = !0;
        let t = () => {
          ((this._isTransitioning = !1),
            this._element.classList.remove(nt),
            this._element.classList.add(tt),
            N.trigger(this._element, Qe));
        };
        ((this._element.style[e] = ``),
          this._queueCallback(t, this._element, !0));
      }
      _isShown(e = this._element) {
        return e.classList.contains(et);
      }
      _configAfterMerge(e) {
        return ((e.toggle = !!e.toggle), (e.parent = l(e.parent)), e);
      }
      _getDimension() {
        return this._element.classList.contains(`collapse-horizontal`)
          ? `width`
          : `height`;
      }
      _initializeChildren() {
        if (!this._config.parent) return;
        let e = this._getFirstLevelChildren(it);
        for (let t of e) {
          let e = I.getElementFromSelector(t);
          e && this._addAriaAndCollapsedClass([t], this._isShown(e));
        }
      }
      _getFirstLevelChildren(e) {
        let t = I.find(rt, this._config.parent);
        return I.find(e, this._config.parent).filter((e) => !t.includes(e));
      }
      _addAriaAndCollapsedClass(e, t) {
        if (e.length)
          for (let n of e)
            (n.classList.toggle(`collapsed`, !t),
              n.setAttribute(`aria-expanded`, t));
      }
      static jQueryInterface(e) {
        let t = {};
        return (
          typeof e == `string` && /show|hide/.test(e) && (t.toggle = !1),
          this.each(function () {
            let n = st.getOrCreateInstance(this, t);
            if (typeof e == `string`) {
              if (n[e] === void 0) throw TypeError(`No method named "${e}"`);
              n[e]();
            }
          })
        );
      }
    }
    (N.on(document, $e, it, function (e) {
      (e.target.tagName === `A` ||
        (e.delegateTarget && e.delegateTarget.tagName === `A`)) &&
        e.preventDefault();
      for (let e of I.getMultipleElementsFromSelector(this))
        st.getOrCreateInstance(e, { toggle: !1 }).toggle();
    }),
      y(st));
    var B = `top`,
      V = `bottom`,
      H = `right`,
      U = `left`,
      ct = `auto`,
      lt = [B, V, H, U],
      ut = `start`,
      dt = `end`,
      ft = `clippingParents`,
      pt = `viewport`,
      mt = `popper`,
      ht = `reference`,
      gt = lt.reduce(function (e, t) {
        return e.concat([t + `-` + ut, t + `-` + dt]);
      }, []),
      _t = [].concat(lt, [ct]).reduce(function (e, t) {
        return e.concat([t, t + `-` + ut, t + `-` + dt]);
      }, []),
      vt = `beforeRead`,
      yt = `read`,
      bt = `afterRead`,
      xt = `beforeMain`,
      St = `main`,
      Ct = `afterMain`,
      wt = `beforeWrite`,
      Tt = `write`,
      Et = `afterWrite`,
      Dt = [vt, yt, bt, xt, St, Ct, wt, Tt, Et];
    function W(e) {
      return e ? (e.nodeName || ``).toLowerCase() : null;
    }
    function G(e) {
      if (e == null) return window;
      if (e.toString() !== `[object Window]`) {
        var t = e.ownerDocument;
        return (t && t.defaultView) || window;
      }
      return e;
    }
    function Ot(e) {
      return e instanceof G(e).Element || e instanceof Element;
    }
    function K(e) {
      return e instanceof G(e).HTMLElement || e instanceof HTMLElement;
    }
    function kt(e) {
      return typeof ShadowRoot > `u`
        ? !1
        : e instanceof G(e).ShadowRoot || e instanceof ShadowRoot;
    }
    function At(e) {
      var t = e.state;
      Object.keys(t.elements).forEach(function (e) {
        var n = t.styles[e] || {},
          r = t.attributes[e] || {},
          i = t.elements[e];
        !K(i) ||
          !W(i) ||
          (Object.assign(i.style, n),
          Object.keys(r).forEach(function (e) {
            var t = r[e];
            t === !1
              ? i.removeAttribute(e)
              : i.setAttribute(e, t === !0 ? `` : t);
          }));
      });
    }
    function jt(e) {
      var t = e.state,
        n = {
          popper: {
            position: t.options.strategy,
            left: `0`,
            top: `0`,
            margin: `0`,
          },
          arrow: { position: `absolute` },
          reference: {},
        };
      return (
        Object.assign(t.elements.popper.style, n.popper),
        (t.styles = n),
        t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
        function () {
          Object.keys(t.elements).forEach(function (e) {
            var r = t.elements[e],
              i = t.attributes[e] || {},
              a = Object.keys(
                t.styles.hasOwnProperty(e) ? t.styles[e] : n[e]
              ).reduce(function (e, t) {
                return ((e[t] = ``), e);
              }, {});
            !K(r) ||
              !W(r) ||
              (Object.assign(r.style, a),
              Object.keys(i).forEach(function (e) {
                r.removeAttribute(e);
              }));
          });
        }
      );
    }
    let Mt = {
      name: `applyStyles`,
      enabled: !0,
      phase: `write`,
      fn: At,
      effect: jt,
      requires: [`computeStyles`],
    };
    function q(e) {
      return e.split(`-`)[0];
    }
    var Nt = Math.max,
      Pt = Math.min,
      Ft = Math.round;
    function It() {
      var e = navigator.userAgentData;
      return e != null && e.brands && Array.isArray(e.brands)
        ? e.brands
            .map(function (e) {
              return e.brand + `/` + e.version;
            })
            .join(` `)
        : navigator.userAgent;
    }
    function Lt() {
      return !/^((?!chrome|android).)*safari/i.test(It());
    }
    function Rt(e, t, n) {
      (t === void 0 && (t = !1), n === void 0 && (n = !1));
      var r = e.getBoundingClientRect(),
        i = 1,
        a = 1;
      t &&
        K(e) &&
        ((i = (e.offsetWidth > 0 && Ft(r.width) / e.offsetWidth) || 1),
        (a = (e.offsetHeight > 0 && Ft(r.height) / e.offsetHeight) || 1));
      var o = (Ot(e) ? G(e) : window).visualViewport,
        s = !Lt() && n,
        c = (r.left + (s && o ? o.offsetLeft : 0)) / i,
        l = (r.top + (s && o ? o.offsetTop : 0)) / a,
        u = r.width / i,
        d = r.height / a;
      return {
        width: u,
        height: d,
        top: l,
        right: c + u,
        bottom: l + d,
        left: c,
        x: c,
        y: l,
      };
    }
    function zt(e) {
      var t = Rt(e),
        n = e.offsetWidth,
        r = e.offsetHeight;
      return (
        Math.abs(t.width - n) <= 1 && (n = t.width),
        Math.abs(t.height - r) <= 1 && (r = t.height),
        { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
      );
    }
    function Bt(e, t) {
      var n = t.getRootNode && t.getRootNode();
      if (e.contains(t)) return !0;
      if (n && kt(n)) {
        var r = t;
        do {
          if (r && e.isSameNode(r)) return !0;
          r = r.parentNode || r.host;
        } while (r);
      }
      return !1;
    }
    function J(e) {
      return G(e).getComputedStyle(e);
    }
    function Vt(e) {
      return [`table`, `td`, `th`].indexOf(W(e)) >= 0;
    }
    function Y(e) {
      return ((Ot(e) ? e.ownerDocument : e.document) || window.document)
        .documentElement;
    }
    function Ht(e) {
      return W(e) === `html`
        ? e
        : e.assignedSlot || e.parentNode || (kt(e) ? e.host : null) || Y(e);
    }
    function Ut(e) {
      return !K(e) || J(e).position === `fixed` ? null : e.offsetParent;
    }
    function Wt(e) {
      var t = /firefox/i.test(It());
      if (/Trident/i.test(It()) && K(e) && J(e).position === `fixed`)
        return null;
      var n = Ht(e);
      for (
        kt(n) && (n = n.host);
        K(n) && [`html`, `body`].indexOf(W(n)) < 0;
      ) {
        var r = J(n);
        if (
          r.transform !== `none` ||
          r.perspective !== `none` ||
          r.contain === `paint` ||
          [`transform`, `perspective`].indexOf(r.willChange) !== -1 ||
          (t && r.willChange === `filter`) ||
          (t && r.filter && r.filter !== `none`)
        )
          return n;
        n = n.parentNode;
      }
      return null;
    }
    function Gt(e) {
      for (var t = G(e), n = Ut(e); n && Vt(n) && J(n).position === `static`; )
        n = Ut(n);
      return n &&
        (W(n) === `html` || (W(n) === `body` && J(n).position === `static`))
        ? t
        : n || Wt(e) || t;
    }
    function Kt(e) {
      return [`top`, `bottom`].indexOf(e) >= 0 ? `x` : `y`;
    }
    function qt(e, t, n) {
      return Nt(e, Pt(t, n));
    }
    function Jt(e, t, n) {
      var r = qt(e, t, n);
      return r > n ? n : r;
    }
    function Yt() {
      return { top: 0, right: 0, bottom: 0, left: 0 };
    }
    function Xt(e) {
      return Object.assign({}, Yt(), e);
    }
    function Zt(e, t) {
      return t.reduce(function (t, n) {
        return ((t[n] = e), t);
      }, {});
    }
    var Qt = function (e, t) {
      return (
        (e =
          typeof e == `function`
            ? e(Object.assign({}, t.rects, { placement: t.placement }))
            : e),
        Xt(typeof e == `number` ? Zt(e, lt) : e)
      );
    };
    function $t(e) {
      var t,
        n = e.state,
        r = e.name,
        i = e.options,
        a = n.elements.arrow,
        o = n.modifiersData.popperOffsets,
        s = q(n.placement),
        c = Kt(s),
        l = [U, H].indexOf(s) >= 0 ? `height` : `width`;
      if (!(!a || !o)) {
        var u = Qt(i.padding, n),
          d = zt(a),
          f = c === `y` ? B : U,
          p = c === `y` ? V : H,
          m =
            n.rects.reference[l] +
            n.rects.reference[c] -
            o[c] -
            n.rects.popper[l],
          h = o[c] - n.rects.reference[c],
          g = Gt(a),
          _ = g ? (c === `y` ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
          v = m / 2 - h / 2,
          y = u[f],
          b = _ - d[l] - u[p],
          x = _ / 2 - d[l] / 2 + v,
          S = qt(y, x, b),
          C = c;
        n.modifiersData[r] =
          ((t = {}), (t[C] = S), (t.centerOffset = S - x), t);
      }
    }
    function en(e) {
      var t = e.state,
        n = e.options.element,
        r = n === void 0 ? `[data-popper-arrow]` : n;
      r != null &&
        ((typeof r == `string` &&
          ((r = t.elements.popper.querySelector(r)), !r)) ||
          (Bt(t.elements.popper, r) && (t.elements.arrow = r)));
    }
    let tn = {
      name: `arrow`,
      enabled: !0,
      phase: `main`,
      fn: $t,
      effect: en,
      requires: [`popperOffsets`],
      requiresIfExists: [`preventOverflow`],
    };
    function nn(e) {
      return e.split(`-`)[1];
    }
    var rn = { top: `auto`, right: `auto`, bottom: `auto`, left: `auto` };
    function an(e, t) {
      var n = e.x,
        r = e.y,
        i = t.devicePixelRatio || 1;
      return { x: Ft(n * i) / i || 0, y: Ft(r * i) / i || 0 };
    }
    function on(e) {
      var t,
        n = e.popper,
        r = e.popperRect,
        i = e.placement,
        a = e.variation,
        o = e.offsets,
        s = e.position,
        c = e.gpuAcceleration,
        l = e.adaptive,
        u = e.roundOffsets,
        d = e.isFixed,
        f = o.x,
        p = f === void 0 ? 0 : f,
        m = o.y,
        h = m === void 0 ? 0 : m,
        g = typeof u == `function` ? u({ x: p, y: h }) : { x: p, y: h };
      ((p = g.x), (h = g.y));
      var _ = o.hasOwnProperty(`x`),
        v = o.hasOwnProperty(`y`),
        y = U,
        b = B,
        x = window;
      if (l) {
        var S = Gt(n),
          C = `clientHeight`,
          w = `clientWidth`;
        if (
          (S === G(n) &&
            ((S = Y(n)),
            J(S).position !== `static` &&
              s === `absolute` &&
              ((C = `scrollHeight`), (w = `scrollWidth`))),
          (S = S),
          i === B || ((i === U || i === H) && a === dt))
        ) {
          b = V;
          var T =
            d && S === x && x.visualViewport ? x.visualViewport.height : S[C];
          ((h -= T - r.height), (h *= c ? 1 : -1));
        }
        if (i === U || ((i === B || i === V) && a === dt)) {
          y = H;
          var E =
            d && S === x && x.visualViewport ? x.visualViewport.width : S[w];
          ((p -= E - r.width), (p *= c ? 1 : -1));
        }
      }
      var D = Object.assign({ position: s }, l && rn),
        O = u === !0 ? an({ x: p, y: h }, G(n)) : { x: p, y: h };
      if (((p = O.x), (h = O.y), c)) {
        var k;
        return Object.assign(
          {},
          D,
          ((k = {}),
          (k[b] = v ? `0` : ``),
          (k[y] = _ ? `0` : ``),
          (k.transform =
            (x.devicePixelRatio || 1) <= 1
              ? `translate(` + p + `px, ` + h + `px)`
              : `translate3d(` + p + `px, ` + h + `px, 0)`),
          k)
        );
      }
      return Object.assign(
        {},
        D,
        ((t = {}),
        (t[b] = v ? h + `px` : ``),
        (t[y] = _ ? p + `px` : ``),
        (t.transform = ``),
        t)
      );
    }
    function sn(e) {
      var t = e.state,
        n = e.options,
        r = n.gpuAcceleration,
        i = r === void 0 ? !0 : r,
        a = n.adaptive,
        o = a === void 0 ? !0 : a,
        s = n.roundOffsets,
        c = s === void 0 ? !0 : s,
        l = {
          placement: q(t.placement),
          variation: nn(t.placement),
          popper: t.elements.popper,
          popperRect: t.rects.popper,
          gpuAcceleration: i,
          isFixed: t.options.strategy === `fixed`,
        };
      (t.modifiersData.popperOffsets != null &&
        (t.styles.popper = Object.assign(
          {},
          t.styles.popper,
          on(
            Object.assign({}, l, {
              offsets: t.modifiersData.popperOffsets,
              position: t.options.strategy,
              adaptive: o,
              roundOffsets: c,
            })
          )
        )),
        t.modifiersData.arrow != null &&
          (t.styles.arrow = Object.assign(
            {},
            t.styles.arrow,
            on(
              Object.assign({}, l, {
                offsets: t.modifiersData.arrow,
                position: `absolute`,
                adaptive: !1,
                roundOffsets: c,
              })
            )
          )),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          'data-popper-placement': t.placement,
        })));
    }
    let cn = {
      name: `computeStyles`,
      enabled: !0,
      phase: `beforeWrite`,
      fn: sn,
      data: {},
    };
    var ln = { passive: !0 };
    function un(e) {
      var t = e.state,
        n = e.instance,
        r = e.options,
        i = r.scroll,
        a = i === void 0 ? !0 : i,
        o = r.resize,
        s = o === void 0 ? !0 : o,
        c = G(t.elements.popper),
        l = [].concat(t.scrollParents.reference, t.scrollParents.popper);
      return (
        a &&
          l.forEach(function (e) {
            e.addEventListener(`scroll`, n.update, ln);
          }),
        s && c.addEventListener(`resize`, n.update, ln),
        function () {
          (a &&
            l.forEach(function (e) {
              e.removeEventListener(`scroll`, n.update, ln);
            }),
            s && c.removeEventListener(`resize`, n.update, ln));
        }
      );
    }
    let dn = {
      name: `eventListeners`,
      enabled: !0,
      phase: `write`,
      fn: function () {},
      effect: un,
      data: {},
    };
    var fn = { left: `right`, right: `left`, bottom: `top`, top: `bottom` };
    function pn(e) {
      return e.replace(/left|right|bottom|top/g, function (e) {
        return fn[e];
      });
    }
    var mn = { start: `end`, end: `start` };
    function hn(e) {
      return e.replace(/start|end/g, function (e) {
        return mn[e];
      });
    }
    function gn(e) {
      var t = G(e);
      return { scrollLeft: t.pageXOffset, scrollTop: t.pageYOffset };
    }
    function _n(e) {
      return Rt(Y(e)).left + gn(e).scrollLeft;
    }
    function vn(e, t) {
      var n = G(e),
        r = Y(e),
        i = n.visualViewport,
        a = r.clientWidth,
        o = r.clientHeight,
        s = 0,
        c = 0;
      if (i) {
        ((a = i.width), (o = i.height));
        var l = Lt();
        (l || (!l && t === `fixed`)) && ((s = i.offsetLeft), (c = i.offsetTop));
      }
      return { width: a, height: o, x: s + _n(e), y: c };
    }
    function yn(e) {
      var t = Y(e),
        n = gn(e),
        r = e.ownerDocument?.body,
        i = Nt(
          t.scrollWidth,
          t.clientWidth,
          r ? r.scrollWidth : 0,
          r ? r.clientWidth : 0
        ),
        a = Nt(
          t.scrollHeight,
          t.clientHeight,
          r ? r.scrollHeight : 0,
          r ? r.clientHeight : 0
        ),
        o = -n.scrollLeft + _n(e),
        s = -n.scrollTop;
      return (
        J(r || t).direction === `rtl` &&
          (o += Nt(t.clientWidth, r ? r.clientWidth : 0) - i),
        { width: i, height: a, x: o, y: s }
      );
    }
    function bn(e) {
      var t = J(e),
        n = t.overflow,
        r = t.overflowX,
        i = t.overflowY;
      return /auto|scroll|overlay|hidden/.test(n + i + r);
    }
    function xn(e) {
      return [`html`, `body`, `#document`].indexOf(W(e)) >= 0
        ? e.ownerDocument.body
        : K(e) && bn(e)
          ? e
          : xn(Ht(e));
    }
    function Sn(e, t) {
      t === void 0 && (t = []);
      var n = xn(e),
        r = n === e.ownerDocument?.body,
        i = G(n),
        a = r ? [i].concat(i.visualViewport || [], bn(n) ? n : []) : n,
        o = t.concat(a);
      return r ? o : o.concat(Sn(Ht(a)));
    }
    function Cn(e) {
      return Object.assign({}, e, {
        left: e.x,
        top: e.y,
        right: e.x + e.width,
        bottom: e.y + e.height,
      });
    }
    function wn(e, t) {
      var n = Rt(e, !1, t === `fixed`);
      return (
        (n.top += e.clientTop),
        (n.left += e.clientLeft),
        (n.bottom = n.top + e.clientHeight),
        (n.right = n.left + e.clientWidth),
        (n.width = e.clientWidth),
        (n.height = e.clientHeight),
        (n.x = n.left),
        (n.y = n.top),
        n
      );
    }
    function Tn(e, t, n) {
      return t === pt ? Cn(vn(e, n)) : Ot(t) ? wn(t, n) : Cn(yn(Y(e)));
    }
    function En(e) {
      var t = Sn(Ht(e)),
        n =
          [`absolute`, `fixed`].indexOf(J(e).position) >= 0 && K(e) ? Gt(e) : e;
      return Ot(n)
        ? t.filter(function (e) {
            return Ot(e) && Bt(e, n) && W(e) !== `body`;
          })
        : [];
    }
    function Dn(e, t, n, r) {
      var i = t === `clippingParents` ? En(e) : [].concat(t),
        a = [].concat(i, [n]),
        o = a[0],
        s = a.reduce(
          function (t, n) {
            var i = Tn(e, n, r);
            return (
              (t.top = Nt(i.top, t.top)),
              (t.right = Pt(i.right, t.right)),
              (t.bottom = Pt(i.bottom, t.bottom)),
              (t.left = Nt(i.left, t.left)),
              t
            );
          },
          Tn(e, o, r)
        );
      return (
        (s.width = s.right - s.left),
        (s.height = s.bottom - s.top),
        (s.x = s.left),
        (s.y = s.top),
        s
      );
    }
    function On(e) {
      var t = e.reference,
        n = e.element,
        r = e.placement,
        i = r ? q(r) : null,
        a = r ? nn(r) : null,
        o = t.x + t.width / 2 - n.width / 2,
        s = t.y + t.height / 2 - n.height / 2,
        c;
      switch (i) {
        case B:
          c = { x: o, y: t.y - n.height };
          break;
        case V:
          c = { x: o, y: t.y + t.height };
          break;
        case H:
          c = { x: t.x + t.width, y: s };
          break;
        case U:
          c = { x: t.x - n.width, y: s };
          break;
        default:
          c = { x: t.x, y: t.y };
      }
      var l = i ? Kt(i) : null;
      if (l != null) {
        var u = l === `y` ? `height` : `width`;
        switch (a) {
          case ut:
            c[l] = c[l] - (t[u] / 2 - n[u] / 2);
            break;
          case dt:
            c[l] = c[l] + (t[u] / 2 - n[u] / 2);
            break;
        }
      }
      return c;
    }
    function kn(e, t) {
      t === void 0 && (t = {});
      var n = t,
        r = n.placement,
        i = r === void 0 ? e.placement : r,
        a = n.strategy,
        o = a === void 0 ? e.strategy : a,
        s = n.boundary,
        c = s === void 0 ? ft : s,
        l = n.rootBoundary,
        u = l === void 0 ? pt : l,
        d = n.elementContext,
        f = d === void 0 ? mt : d,
        p = n.altBoundary,
        m = p === void 0 ? !1 : p,
        h = n.padding,
        g = h === void 0 ? 0 : h,
        _ = Xt(typeof g == `number` ? Zt(g, lt) : g),
        v = f === mt ? ht : mt,
        y = e.rects.popper,
        b = e.elements[m ? v : f],
        x = Dn(Ot(b) ? b : b.contextElement || Y(e.elements.popper), c, u, o),
        S = Rt(e.elements.reference),
        C = On({ reference: S, element: y, placement: i }),
        w = Cn(Object.assign({}, y, C)),
        T = f === mt ? w : S,
        E = {
          top: x.top - T.top + _.top,
          bottom: T.bottom - x.bottom + _.bottom,
          left: x.left - T.left + _.left,
          right: T.right - x.right + _.right,
        },
        D = e.modifiersData.offset;
      if (f === mt && D) {
        var O = D[i];
        Object.keys(E).forEach(function (e) {
          var t = [H, V].indexOf(e) >= 0 ? 1 : -1,
            n = [B, V].indexOf(e) >= 0 ? `y` : `x`;
          E[e] += O[n] * t;
        });
      }
      return E;
    }
    function An(e, t) {
      t === void 0 && (t = {});
      var n = t,
        r = n.placement,
        i = n.boundary,
        a = n.rootBoundary,
        o = n.padding,
        s = n.flipVariations,
        c = n.allowedAutoPlacements,
        l = c === void 0 ? _t : c,
        u = nn(r),
        d = u
          ? s
            ? gt
            : gt.filter(function (e) {
                return nn(e) === u;
              })
          : lt,
        f = d.filter(function (e) {
          return l.indexOf(e) >= 0;
        });
      f.length === 0 && (f = d);
      var p = f.reduce(function (t, n) {
        return (
          (t[n] = kn(e, {
            placement: n,
            boundary: i,
            rootBoundary: a,
            padding: o,
          })[q(n)]),
          t
        );
      }, {});
      return Object.keys(p).sort(function (e, t) {
        return p[e] - p[t];
      });
    }
    function jn(e) {
      if (q(e) === ct) return [];
      var t = pn(e);
      return [hn(e), t, hn(t)];
    }
    function Mn(e) {
      var t = e.state,
        n = e.options,
        r = e.name;
      if (!t.modifiersData[r]._skip) {
        for (
          var i = n.mainAxis,
            a = i === void 0 ? !0 : i,
            o = n.altAxis,
            s = o === void 0 ? !0 : o,
            c = n.fallbackPlacements,
            l = n.padding,
            u = n.boundary,
            d = n.rootBoundary,
            f = n.altBoundary,
            p = n.flipVariations,
            m = p === void 0 ? !0 : p,
            h = n.allowedAutoPlacements,
            g = t.options.placement,
            _ = q(g) === g,
            v = c || (_ || !m ? [pn(g)] : jn(g)),
            y = [g].concat(v).reduce(function (e, n) {
              return e.concat(
                q(n) === ct
                  ? An(t, {
                      placement: n,
                      boundary: u,
                      rootBoundary: d,
                      padding: l,
                      flipVariations: m,
                      allowedAutoPlacements: h,
                    })
                  : n
              );
            }, []),
            b = t.rects.reference,
            x = t.rects.popper,
            S = new Map(),
            C = !0,
            w = y[0],
            T = 0;
          T < y.length;
          T++
        ) {
          var E = y[T],
            D = q(E),
            O = nn(E) === ut,
            k = [B, V].indexOf(D) >= 0,
            ee = k ? `width` : `height`,
            A = kn(t, {
              placement: E,
              boundary: u,
              rootBoundary: d,
              altBoundary: f,
              padding: l,
            }),
            j = k ? (O ? H : U) : O ? V : B;
          b[ee] > x[ee] && (j = pn(j));
          var te = pn(j),
            M = [];
          if (
            (a && M.push(A[D] <= 0),
            s && M.push(A[j] <= 0, A[te] <= 0),
            M.every(function (e) {
              return e;
            }))
          ) {
            ((w = E), (C = !1));
            break;
          }
          S.set(E, M);
        }
        if (C)
          for (
            var ne = m ? 3 : 1,
              re = function (e) {
                var t = y.find(function (t) {
                  var n = S.get(t);
                  if (n)
                    return n.slice(0, e).every(function (e) {
                      return e;
                    });
                });
                if (t) return ((w = t), `break`);
              },
              ie = ne;
            ie > 0 && re(ie) !== `break`;
            ie--
          );
        t.placement !== w &&
          ((t.modifiersData[r]._skip = !0), (t.placement = w), (t.reset = !0));
      }
    }
    let Nn = {
      name: `flip`,
      enabled: !0,
      phase: `main`,
      fn: Mn,
      requiresIfExists: [`offset`],
      data: { _skip: !1 },
    };
    function Pn(e, t, n) {
      return (
        n === void 0 && (n = { x: 0, y: 0 }),
        {
          top: e.top - t.height - n.y,
          right: e.right - t.width + n.x,
          bottom: e.bottom - t.height + n.y,
          left: e.left - t.width - n.x,
        }
      );
    }
    function Fn(e) {
      return [B, H, V, U].some(function (t) {
        return e[t] >= 0;
      });
    }
    function In(e) {
      var t = e.state,
        n = e.name,
        r = t.rects.reference,
        i = t.rects.popper,
        a = t.modifiersData.preventOverflow,
        o = kn(t, { elementContext: `reference` }),
        s = kn(t, { altBoundary: !0 }),
        c = Pn(o, r),
        l = Pn(s, i, a),
        u = Fn(c),
        d = Fn(l);
      ((t.modifiersData[n] = {
        referenceClippingOffsets: c,
        popperEscapeOffsets: l,
        isReferenceHidden: u,
        hasPopperEscaped: d,
      }),
        (t.attributes.popper = Object.assign({}, t.attributes.popper, {
          'data-popper-reference-hidden': u,
          'data-popper-escaped': d,
        })));
    }
    let Ln = {
      name: `hide`,
      enabled: !0,
      phase: `main`,
      requiresIfExists: [`preventOverflow`],
      fn: In,
    };
    function Rn(e, t, n) {
      var r = q(e),
        i = [U, B].indexOf(r) >= 0 ? -1 : 1,
        a =
          typeof n == `function`
            ? n(Object.assign({}, t, { placement: e }))
            : n,
        o = a[0],
        s = a[1];
      return (
        (o ||= 0),
        (s = (s || 0) * i),
        [U, H].indexOf(r) >= 0 ? { x: s, y: o } : { x: o, y: s }
      );
    }
    function zn(e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        i = n.offset,
        a = i === void 0 ? [0, 0] : i,
        o = _t.reduce(function (e, n) {
          return ((e[n] = Rn(n, t.rects, a)), e);
        }, {}),
        s = o[t.placement],
        c = s.x,
        l = s.y;
      (t.modifiersData.popperOffsets != null &&
        ((t.modifiersData.popperOffsets.x += c),
        (t.modifiersData.popperOffsets.y += l)),
        (t.modifiersData[r] = o));
    }
    let Bn = {
      name: `offset`,
      enabled: !0,
      phase: `main`,
      requires: [`popperOffsets`],
      fn: zn,
    };
    function Vn(e) {
      var t = e.state,
        n = e.name;
      t.modifiersData[n] = On({
        reference: t.rects.reference,
        element: t.rects.popper,
        placement: t.placement,
      });
    }
    let Hn = {
      name: `popperOffsets`,
      enabled: !0,
      phase: `read`,
      fn: Vn,
      data: {},
    };
    function Un(e) {
      return e === `x` ? `y` : `x`;
    }
    function Wn(e) {
      var t = e.state,
        n = e.options,
        r = e.name,
        i = n.mainAxis,
        a = i === void 0 ? !0 : i,
        o = n.altAxis,
        s = o === void 0 ? !1 : o,
        c = n.boundary,
        l = n.rootBoundary,
        u = n.altBoundary,
        d = n.padding,
        f = n.tether,
        p = f === void 0 ? !0 : f,
        m = n.tetherOffset,
        h = m === void 0 ? 0 : m,
        g = kn(t, { boundary: c, rootBoundary: l, padding: d, altBoundary: u }),
        _ = q(t.placement),
        v = nn(t.placement),
        y = !v,
        b = Kt(_),
        x = Un(b),
        S = t.modifiersData.popperOffsets,
        C = t.rects.reference,
        w = t.rects.popper,
        T =
          typeof h == `function`
            ? h(Object.assign({}, t.rects, { placement: t.placement }))
            : h,
        E =
          typeof T == `number`
            ? { mainAxis: T, altAxis: T }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, T),
        D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null,
        O = { x: 0, y: 0 };
      if (S) {
        if (a) {
          var k = b === `y` ? B : U,
            ee = b === `y` ? V : H,
            A = b === `y` ? `height` : `width`,
            j = S[b],
            te = j + g[k],
            M = j - g[ee],
            ne = p ? -w[A] / 2 : 0,
            re = v === ut ? C[A] : w[A],
            ie = v === ut ? -w[A] : -C[A],
            ae = t.elements.arrow,
            oe = p && ae ? zt(ae) : { width: 0, height: 0 },
            N = t.modifiersData[`arrow#persistent`]
              ? t.modifiersData[`arrow#persistent`].padding
              : Yt(),
            se = N[k],
            ce = N[ee],
            le = qt(0, C[A], oe[A]),
            P = y
              ? C[A] / 2 - ne - le - se - E.mainAxis
              : re - le - se - E.mainAxis,
            ue = y
              ? -C[A] / 2 + ne + le + ce + E.mainAxis
              : ie + le + ce + E.mainAxis,
            F = t.elements.arrow && Gt(t.elements.arrow),
            de = F ? (b === `y` ? F.clientTop || 0 : F.clientLeft || 0) : 0,
            I = D?.[b] ?? 0,
            fe = j + P - I - de,
            pe = j + ue - I,
            me = qt(p ? Pt(te, fe) : te, j, p ? Nt(M, pe) : M);
          ((S[b] = me), (O[b] = me - j));
        }
        if (s) {
          var he = b === `x` ? B : U,
            ge = b === `x` ? V : H,
            L = S[x],
            R = x === `y` ? `height` : `width`,
            z = L + g[he],
            _e = L - g[ge],
            ve = [B, U].indexOf(_) !== -1,
            ye = D?.[x] ?? 0,
            be = ve ? z : L - C[R] - w[R] - ye + E.altAxis,
            xe = ve ? L + C[R] + w[R] - ye - E.altAxis : _e,
            Se = p && ve ? Jt(be, L, xe) : qt(p ? be : z, L, p ? xe : _e);
          ((S[x] = Se), (O[x] = Se - L));
        }
        t.modifiersData[r] = O;
      }
    }
    let Gn = {
      name: `preventOverflow`,
      enabled: !0,
      phase: `main`,
      fn: Wn,
      requiresIfExists: [`offset`],
    };
    function Kn(e) {
      return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
    }
    function qn(e) {
      return e === G(e) || !K(e) ? gn(e) : Kn(e);
    }
    function Jn(e) {
      var t = e.getBoundingClientRect(),
        n = Ft(t.width) / e.offsetWidth || 1,
        r = Ft(t.height) / e.offsetHeight || 1;
      return n !== 1 || r !== 1;
    }
    function Yn(e, t, n) {
      n === void 0 && (n = !1);
      var r = K(t),
        i = K(t) && Jn(t),
        a = Y(t),
        o = Rt(e, i, n),
        s = { scrollLeft: 0, scrollTop: 0 },
        c = { x: 0, y: 0 };
      return (
        (r || (!r && !n)) &&
          ((W(t) !== `body` || bn(a)) && (s = qn(t)),
          K(t)
            ? ((c = Rt(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
            : a && (c.x = _n(a))),
        {
          x: o.left + s.scrollLeft - c.x,
          y: o.top + s.scrollTop - c.y,
          width: o.width,
          height: o.height,
        }
      );
    }
    function Xn(e) {
      var t = new Map(),
        n = new Set(),
        r = [];
      e.forEach(function (e) {
        t.set(e.name, e);
      });
      function i(e) {
        (n.add(e.name),
          []
            .concat(e.requires || [], e.requiresIfExists || [])
            .forEach(function (e) {
              if (!n.has(e)) {
                var r = t.get(e);
                r && i(r);
              }
            }),
          r.push(e));
      }
      return (
        e.forEach(function (e) {
          n.has(e.name) || i(e);
        }),
        r
      );
    }
    function Zn(e) {
      var t = Xn(e);
      return Dt.reduce(function (e, n) {
        return e.concat(
          t.filter(function (e) {
            return e.phase === n;
          })
        );
      }, []);
    }
    function Qn(e) {
      var t;
      return function () {
        return (
          (t ||= new Promise(function (n) {
            Promise.resolve().then(function () {
              ((t = void 0), n(e()));
            });
          })),
          t
        );
      };
    }
    function $n(e) {
      var t = e.reduce(function (e, t) {
        var n = e[t.name];
        return (
          (e[t.name] = n
            ? Object.assign({}, n, t, {
                options: Object.assign({}, n.options, t.options),
                data: Object.assign({}, n.data, t.data),
              })
            : t),
          e
        );
      }, {});
      return Object.keys(t).map(function (e) {
        return t[e];
      });
    }
    var er = { placement: `bottom`, modifiers: [], strategy: `absolute` };
    function tr() {
      return ![...arguments].some(function (e) {
        return !(e && typeof e.getBoundingClientRect == `function`);
      });
    }
    function nr(e) {
      e === void 0 && (e = {});
      var t = e,
        n = t.defaultModifiers,
        r = n === void 0 ? [] : n,
        i = t.defaultOptions,
        a = i === void 0 ? er : i;
      return function (e, t, n) {
        n === void 0 && (n = a);
        var i = {
            placement: `bottom`,
            orderedModifiers: [],
            options: Object.assign({}, er, a),
            modifiersData: {},
            elements: { reference: e, popper: t },
            attributes: {},
            styles: {},
          },
          o = [],
          s = !1,
          c = {
            state: i,
            setOptions: function (n) {
              var o = typeof n == `function` ? n(i.options) : n;
              (u(),
                (i.options = Object.assign({}, a, i.options, o)),
                (i.scrollParents = {
                  reference: Ot(e)
                    ? Sn(e)
                    : e.contextElement
                      ? Sn(e.contextElement)
                      : [],
                  popper: Sn(t),
                }));
              var s = Zn($n([].concat(r, i.options.modifiers)));
              return (
                (i.orderedModifiers = s.filter(function (e) {
                  return e.enabled;
                })),
                l(),
                c.update()
              );
            },
            forceUpdate: function () {
              if (!s) {
                var e = i.elements,
                  t = e.reference,
                  n = e.popper;
                if (tr(t, n)) {
                  ((i.rects = {
                    reference: Yn(t, Gt(n), i.options.strategy === `fixed`),
                    popper: zt(n),
                  }),
                    (i.reset = !1),
                    (i.placement = i.options.placement),
                    i.orderedModifiers.forEach(function (e) {
                      return (i.modifiersData[e.name] = Object.assign(
                        {},
                        e.data
                      ));
                    }));
                  for (var r = 0; r < i.orderedModifiers.length; r++) {
                    if (i.reset === !0) {
                      ((i.reset = !1), (r = -1));
                      continue;
                    }
                    var a = i.orderedModifiers[r],
                      o = a.fn,
                      l = a.options,
                      u = l === void 0 ? {} : l,
                      d = a.name;
                    typeof o == `function` &&
                      (i =
                        o({ state: i, options: u, name: d, instance: c }) || i);
                  }
                }
              }
            },
            update: Qn(function () {
              return new Promise(function (e) {
                (c.forceUpdate(), e(i));
              });
            }),
            destroy: function () {
              (u(), (s = !0));
            },
          };
        if (!tr(e, t)) return c;
        c.setOptions(n).then(function (e) {
          !s && n.onFirstUpdate && n.onFirstUpdate(e);
        });
        function l() {
          i.orderedModifiers.forEach(function (e) {
            var t = e.name,
              n = e.options,
              r = n === void 0 ? {} : n,
              a = e.effect;
            if (typeof a == `function`) {
              var s = a({ state: i, name: t, instance: c, options: r });
              o.push(s || function () {});
            }
          });
        }
        function u() {
          (o.forEach(function (e) {
            return e();
          }),
            (o = []));
        }
        return c;
      };
    }
    var rr = nr(),
      ir = nr({ defaultModifiers: [dn, Hn, cn, Mt] }),
      ar = nr({ defaultModifiers: [dn, Hn, cn, Mt, Bn, Nn, Gn, tn, Ln] });
    let or = Object.freeze(
        Object.defineProperty(
          {
            __proto__: null,
            afterMain: Ct,
            afterRead: bt,
            afterWrite: Et,
            applyStyles: Mt,
            arrow: tn,
            auto: ct,
            basePlacements: lt,
            beforeMain: xt,
            beforeRead: vt,
            beforeWrite: wt,
            bottom: V,
            clippingParents: ft,
            computeStyles: cn,
            createPopper: ar,
            createPopperBase: rr,
            createPopperLite: ir,
            detectOverflow: kn,
            end: dt,
            eventListeners: dn,
            flip: Nn,
            hide: Ln,
            left: U,
            main: St,
            modifierPhases: Dt,
            offset: Bn,
            placements: _t,
            popper: mt,
            popperGenerator: nr,
            popperOffsets: Hn,
            preventOverflow: Gn,
            read: yt,
            reference: ht,
            right: H,
            start: ut,
            top: B,
            variationPlacements: gt,
            viewport: pt,
            write: Tt,
          },
          Symbol.toStringTag,
          { value: `Module` }
        )
      ),
      sr = `.bs.dropdown`,
      cr = `.data-api`,
      lr = `ArrowDown`,
      ur = `hide${sr}`,
      dr = `hidden${sr}`,
      fr = `show${sr}`,
      pr = `shown${sr}`,
      mr = `click${sr}${cr}`,
      hr = `keydown${sr}${cr}`,
      gr = `keyup${sr}${cr}`,
      _r = `show`,
      vr = `[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)`,
      yr = `${vr}.${_r}`,
      br = `.dropdown-menu`,
      xr = v() ? `top-end` : `top-start`,
      Sr = v() ? `top-start` : `top-end`,
      Cr = v() ? `bottom-end` : `bottom-start`,
      wr = v() ? `bottom-start` : `bottom-end`,
      Tr = v() ? `left-start` : `right-start`,
      Er = v() ? `right-start` : `left-start`,
      Dr = {
        autoClose: !0,
        boundary: `clippingParents`,
        display: `dynamic`,
        offset: [0, 2],
        popperConfig: null,
        reference: `toggle`,
      },
      Or = {
        autoClose: `(boolean|string)`,
        boundary: `(string|element)`,
        display: `string`,
        offset: `(array|string|function)`,
        popperConfig: `(null|object|function)`,
        reference: `(string|element|object)`,
      };
    class X extends F {
      constructor(e, t) {
        (super(e, t),
          (this._popper = null),
          (this._parent = this._element.parentNode),
          (this._menu =
            I.next(this._element, br)[0] ||
            I.prev(this._element, br)[0] ||
            I.findOne(br, this._parent)),
          (this._inNavbar = this._detectNavbar()));
      }
      static get Default() {
        return Dr;
      }
      static get DefaultType() {
        return Or;
      }
      static get NAME() {
        return `dropdown`;
      }
      toggle() {
        return this._isShown() ? this.hide() : this.show();
      }
      show() {
        if (d(this._element) || this._isShown()) return;
        let e = { relatedTarget: this._element };
        if (!N.trigger(this._element, fr, e).defaultPrevented) {
          if (
            (this._createPopper(),
            `ontouchstart` in document.documentElement &&
              !this._parent.closest(`.navbar-nav`))
          )
            for (let e of [].concat(...document.body.children))
              N.on(e, `mouseover`, p);
          (this._element.focus(),
            this._element.setAttribute(`aria-expanded`, !0),
            this._menu.classList.add(_r),
            this._element.classList.add(_r),
            N.trigger(this._element, pr, e));
        }
      }
      hide() {
        if (d(this._element) || !this._isShown()) return;
        let e = { relatedTarget: this._element };
        this._completeHide(e);
      }
      dispose() {
        (this._popper && this._popper.destroy(), super.dispose());
      }
      update() {
        ((this._inNavbar = this._detectNavbar()),
          this._popper && this._popper.update());
      }
      _completeHide(e) {
        if (!N.trigger(this._element, ur, e).defaultPrevented) {
          if (`ontouchstart` in document.documentElement)
            for (let e of [].concat(...document.body.children))
              N.off(e, `mouseover`, p);
          (this._popper && this._popper.destroy(),
            this._menu.classList.remove(_r),
            this._element.classList.remove(_r),
            this._element.setAttribute(`aria-expanded`, `false`),
            P.removeDataAttribute(this._menu, `popper`),
            N.trigger(this._element, dr, e));
        }
      }
      _getConfig(e) {
        if (
          ((e = super._getConfig(e)),
          typeof e.reference == `object` &&
            !c(e.reference) &&
            typeof e.reference.getBoundingClientRect != `function`)
        )
          throw TypeError(
            `DROPDOWN: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`
          );
        return e;
      }
      _createPopper() {
        if (or === void 0)
          throw TypeError(
            `Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)`
          );
        let e = this._element;
        this._config.reference === `parent`
          ? (e = this._parent)
          : c(this._config.reference)
            ? (e = l(this._config.reference))
            : typeof this._config.reference == `object` &&
              (e = this._config.reference);
        let t = this._getPopperConfig();
        this._popper = ar(e, this._menu, t);
      }
      _isShown() {
        return this._menu.classList.contains(_r);
      }
      _getPlacement() {
        let e = this._parent;
        if (e.classList.contains(`dropend`)) return Tr;
        if (e.classList.contains(`dropstart`)) return Er;
        if (e.classList.contains(`dropup-center`)) return `top`;
        if (e.classList.contains(`dropdown-center`)) return `bottom`;
        let t =
          getComputedStyle(this._menu)
            .getPropertyValue(`--bs-position`)
            .trim() === `end`;
        return e.classList.contains(`dropup`) ? (t ? Sr : xr) : t ? wr : Cr;
      }
      _detectNavbar() {
        return this._element.closest(`.navbar`) !== null;
      }
      _getOffset() {
        let { offset: e } = this._config;
        return typeof e == `string`
          ? e.split(`,`).map((e) => Number.parseInt(e, 10))
          : typeof e == `function`
            ? (t) => e(t, this._element)
            : e;
      }
      _getPopperConfig() {
        let e = {
          placement: this._getPlacement(),
          modifiers: [
            {
              name: `preventOverflow`,
              options: { boundary: this._config.boundary },
            },
            { name: `offset`, options: { offset: this._getOffset() } },
          ],
        };
        return (
          (this._inNavbar || this._config.display === `static`) &&
            (P.setDataAttribute(this._menu, `popper`, `static`),
            (e.modifiers = [{ name: `applyStyles`, enabled: !1 }])),
          { ...e, ...b(this._config.popperConfig, [void 0, e]) }
        );
      }
      _selectMenuItem({ key: e, target: t }) {
        let n = I.find(
          `.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)`,
          this._menu
        ).filter((e) => u(e));
        n.length && S(n, t, e === lr, !n.includes(t)).focus();
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = X.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (t[e] === void 0) throw TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
      static clearMenus(e) {
        if (e.button === 2 || (e.type === `keyup` && e.key !== `Tab`)) return;
        let t = I.find(yr);
        for (let n of t) {
          let t = X.getInstance(n);
          if (!t || t._config.autoClose === !1) continue;
          let r = e.composedPath(),
            i = r.includes(t._menu);
          if (
            r.includes(t._element) ||
            (t._config.autoClose === `inside` && !i) ||
            (t._config.autoClose === `outside` && i) ||
            (t._menu.contains(e.target) &&
              ((e.type === `keyup` && e.key === `Tab`) ||
                /input|select|option|textarea|form/i.test(e.target.tagName)))
          )
            continue;
          let a = { relatedTarget: t._element };
          (e.type === `click` && (a.clickEvent = e), t._completeHide(a));
        }
      }
      static dataApiKeydownHandler(e) {
        let t = /input|textarea/i.test(e.target.tagName),
          n = e.key === `Escape`,
          r = [`ArrowUp`, lr].includes(e.key);
        if ((!r && !n) || (t && !n)) return;
        e.preventDefault();
        let i = this.matches(vr)
            ? this
            : I.prev(this, vr)[0] ||
              I.next(this, vr)[0] ||
              I.findOne(vr, e.delegateTarget.parentNode),
          a = X.getOrCreateInstance(i);
        if (r) {
          (e.stopPropagation(), a.show(), a._selectMenuItem(e));
          return;
        }
        a._isShown() && (e.stopPropagation(), a.hide(), i.focus());
      }
    }
    (N.on(document, hr, vr, X.dataApiKeydownHandler),
      N.on(document, hr, br, X.dataApiKeydownHandler),
      N.on(document, mr, X.clearMenus),
      N.on(document, gr, X.clearMenus),
      N.on(document, mr, vr, function (e) {
        (e.preventDefault(), X.getOrCreateInstance(this).toggle());
      }),
      y(X));
    let kr = `backdrop`,
      Ar = `show`,
      jr = `mousedown.bs.${kr}`,
      Mr = {
        className: `modal-backdrop`,
        clickCallback: null,
        isAnimated: !1,
        isVisible: !0,
        rootElement: `body`,
      },
      Nr = {
        className: `string`,
        clickCallback: `(function|null)`,
        isAnimated: `boolean`,
        isVisible: `boolean`,
        rootElement: `(element|string)`,
      };
    class Pr extends ue {
      constructor(e) {
        (super(),
          (this._config = this._getConfig(e)),
          (this._isAppended = !1),
          (this._element = null));
      }
      static get Default() {
        return Mr;
      }
      static get DefaultType() {
        return Nr;
      }
      static get NAME() {
        return kr;
      }
      show(e) {
        if (!this._config.isVisible) {
          b(e);
          return;
        }
        this._append();
        let t = this._getElement();
        (this._config.isAnimated && m(t),
          t.classList.add(Ar),
          this._emulateAnimation(() => {
            b(e);
          }));
      }
      hide(e) {
        if (!this._config.isVisible) {
          b(e);
          return;
        }
        (this._getElement().classList.remove(Ar),
          this._emulateAnimation(() => {
            (this.dispose(), b(e));
          }));
      }
      dispose() {
        this._isAppended &&=
          (N.off(this._element, jr), this._element.remove(), !1);
      }
      _getElement() {
        if (!this._element) {
          let e = document.createElement(`div`);
          ((e.className = this._config.className),
            this._config.isAnimated && e.classList.add(`fade`),
            (this._element = e));
        }
        return this._element;
      }
      _configAfterMerge(e) {
        return ((e.rootElement = l(e.rootElement)), e);
      }
      _append() {
        if (this._isAppended) return;
        let e = this._getElement();
        (this._config.rootElement.append(e),
          N.on(e, jr, () => {
            b(this._config.clickCallback);
          }),
          (this._isAppended = !0));
      }
      _emulateAnimation(e) {
        x(e, this._getElement(), this._config.isAnimated);
      }
    }
    let Fr = `.bs.focustrap`,
      Ir = `focusin${Fr}`,
      Lr = `keydown.tab${Fr}`,
      Rr = `backward`,
      zr = { autofocus: !0, trapElement: null },
      Br = { autofocus: `boolean`, trapElement: `element` };
    class Vr extends ue {
      constructor(e) {
        (super(),
          (this._config = this._getConfig(e)),
          (this._isActive = !1),
          (this._lastTabNavDirection = null));
      }
      static get Default() {
        return zr;
      }
      static get DefaultType() {
        return Br;
      }
      static get NAME() {
        return `focustrap`;
      }
      activate() {
        this._isActive ||=
          (this._config.autofocus && this._config.trapElement.focus(),
          N.off(document, Fr),
          N.on(document, Ir, (e) => this._handleFocusin(e)),
          N.on(document, Lr, (e) => this._handleKeydown(e)),
          !0);
      }
      deactivate() {
        this._isActive && ((this._isActive = !1), N.off(document, Fr));
      }
      _handleFocusin(e) {
        let { trapElement: t } = this._config;
        if (e.target === document || e.target === t || t.contains(e.target))
          return;
        let n = I.focusableChildren(t);
        n.length === 0
          ? t.focus()
          : this._lastTabNavDirection === Rr
            ? n[n.length - 1].focus()
            : n[0].focus();
      }
      _handleKeydown(e) {
        e.key === `Tab` &&
          (this._lastTabNavDirection = e.shiftKey ? Rr : `forward`);
      }
    }
    let Hr = `.fixed-top, .fixed-bottom, .is-fixed, .sticky-top`,
      Ur = `.sticky-top`,
      Wr = `padding-right`,
      Gr = `margin-right`;
    class Kr {
      constructor() {
        this._element = document.body;
      }
      getWidth() {
        let e = document.documentElement.clientWidth;
        return Math.abs(window.innerWidth - e);
      }
      hide() {
        let e = this.getWidth();
        (this._disableOverFlow(),
          this._setElementAttributes(this._element, Wr, (t) => t + e),
          this._setElementAttributes(Hr, Wr, (t) => t + e),
          this._setElementAttributes(Ur, Gr, (t) => t - e));
      }
      reset() {
        (this._resetElementAttributes(this._element, `overflow`),
          this._resetElementAttributes(this._element, Wr),
          this._resetElementAttributes(Hr, Wr),
          this._resetElementAttributes(Ur, Gr));
      }
      isOverflowing() {
        return this.getWidth() > 0;
      }
      _disableOverFlow() {
        (this._saveInitialAttribute(this._element, `overflow`),
          (this._element.style.overflow = `hidden`));
      }
      _setElementAttributes(e, t, n) {
        let r = this.getWidth();
        this._applyManipulationCallback(e, (e) => {
          if (e !== this._element && window.innerWidth > e.clientWidth + r)
            return;
          this._saveInitialAttribute(e, t);
          let i = window.getComputedStyle(e).getPropertyValue(t);
          e.style.setProperty(t, `${n(Number.parseFloat(i))}px`);
        });
      }
      _saveInitialAttribute(e, t) {
        let n = e.style.getPropertyValue(t);
        n && P.setDataAttribute(e, t, n);
      }
      _resetElementAttributes(e, t) {
        this._applyManipulationCallback(e, (e) => {
          let n = P.getDataAttribute(e, t);
          if (n === null) {
            e.style.removeProperty(t);
            return;
          }
          (P.removeDataAttribute(e, t), e.style.setProperty(t, n));
        });
      }
      _applyManipulationCallback(e, t) {
        if (c(e)) {
          t(e);
          return;
        }
        for (let n of I.find(e, this._element)) t(n);
      }
    }
    let Z = `.bs.modal`,
      qr = `hide${Z}`,
      Jr = `hidePrevented${Z}`,
      Yr = `hidden${Z}`,
      Xr = `show${Z}`,
      Zr = `shown${Z}`,
      Qr = `resize${Z}`,
      $r = `click.dismiss${Z}`,
      ei = `mousedown.dismiss${Z}`,
      ti = `keydown.dismiss${Z}`,
      ni = `click${Z}.data-api`,
      ri = `modal-open`,
      ii = `show`,
      ai = `modal-static`,
      oi = { backdrop: !0, focus: !0, keyboard: !0 },
      si = {
        backdrop: `(boolean|string)`,
        focus: `boolean`,
        keyboard: `boolean`,
      };
    class ci extends F {
      constructor(e, t) {
        (super(e, t),
          (this._dialog = I.findOne(`.modal-dialog`, this._element)),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          (this._isShown = !1),
          (this._isTransitioning = !1),
          (this._scrollBar = new Kr()),
          this._addEventListeners());
      }
      static get Default() {
        return oi;
      }
      static get DefaultType() {
        return si;
      }
      static get NAME() {
        return `modal`;
      }
      toggle(e) {
        return this._isShown ? this.hide() : this.show(e);
      }
      show(e) {
        this._isShown ||
          this._isTransitioning ||
          N.trigger(this._element, Xr, { relatedTarget: e }).defaultPrevented ||
          ((this._isShown = !0),
          (this._isTransitioning = !0),
          this._scrollBar.hide(),
          document.body.classList.add(ri),
          this._adjustDialog(),
          this._backdrop.show(() => this._showElement(e)));
      }
      hide() {
        !this._isShown ||
          this._isTransitioning ||
          N.trigger(this._element, qr).defaultPrevented ||
          ((this._isShown = !1),
          (this._isTransitioning = !0),
          this._focustrap.deactivate(),
          this._element.classList.remove(ii),
          this._queueCallback(
            () => this._hideModal(),
            this._element,
            this._isAnimated()
          ));
      }
      dispose() {
        (N.off(window, Z),
          N.off(this._dialog, Z),
          this._backdrop.dispose(),
          this._focustrap.deactivate(),
          super.dispose());
      }
      handleUpdate() {
        this._adjustDialog();
      }
      _initializeBackDrop() {
        return new Pr({
          isVisible: !!this._config.backdrop,
          isAnimated: this._isAnimated(),
        });
      }
      _initializeFocusTrap() {
        return new Vr({ trapElement: this._element });
      }
      _showElement(e) {
        (document.body.contains(this._element) ||
          document.body.append(this._element),
          (this._element.style.display = `block`),
          this._element.removeAttribute(`aria-hidden`),
          this._element.setAttribute(`aria-modal`, !0),
          this._element.setAttribute(`role`, `dialog`),
          (this._element.scrollTop = 0));
        let t = I.findOne(`.modal-body`, this._dialog);
        (t && (t.scrollTop = 0),
          m(this._element),
          this._element.classList.add(ii),
          this._queueCallback(
            () => {
              (this._config.focus && this._focustrap.activate(),
                (this._isTransitioning = !1),
                N.trigger(this._element, Zr, { relatedTarget: e }));
            },
            this._dialog,
            this._isAnimated()
          ));
      }
      _addEventListeners() {
        (N.on(this._element, ti, (e) => {
          if (e.key === `Escape`) {
            if (this._config.keyboard) {
              this.hide();
              return;
            }
            this._triggerBackdropTransition();
          }
        }),
          N.on(window, Qr, () => {
            this._isShown && !this._isTransitioning && this._adjustDialog();
          }),
          N.on(this._element, ei, (e) => {
            N.one(this._element, $r, (t) => {
              if (!(this._element !== e.target || this._element !== t.target)) {
                if (this._config.backdrop === `static`) {
                  this._triggerBackdropTransition();
                  return;
                }
                this._config.backdrop && this.hide();
              }
            });
          }));
      }
      _hideModal() {
        ((this._element.style.display = `none`),
          this._element.setAttribute(`aria-hidden`, !0),
          this._element.removeAttribute(`aria-modal`),
          this._element.removeAttribute(`role`),
          (this._isTransitioning = !1),
          this._backdrop.hide(() => {
            (document.body.classList.remove(ri),
              this._resetAdjustments(),
              this._scrollBar.reset(),
              N.trigger(this._element, Yr));
          }));
      }
      _isAnimated() {
        return this._element.classList.contains(`fade`);
      }
      _triggerBackdropTransition() {
        if (N.trigger(this._element, Jr).defaultPrevented) return;
        let e =
            this._element.scrollHeight > document.documentElement.clientHeight,
          t = this._element.style.overflowY;
        t === `hidden` ||
          this._element.classList.contains(ai) ||
          (e || (this._element.style.overflowY = `hidden`),
          this._element.classList.add(ai),
          this._queueCallback(() => {
            (this._element.classList.remove(ai),
              this._queueCallback(() => {
                this._element.style.overflowY = t;
              }, this._dialog));
          }, this._dialog),
          this._element.focus());
      }
      _adjustDialog() {
        let e =
            this._element.scrollHeight > document.documentElement.clientHeight,
          t = this._scrollBar.getWidth(),
          n = t > 0;
        if (n && !e) {
          let e = v() ? `paddingLeft` : `paddingRight`;
          this._element.style[e] = `${t}px`;
        }
        if (!n && e) {
          let e = v() ? `paddingRight` : `paddingLeft`;
          this._element.style[e] = `${t}px`;
        }
      }
      _resetAdjustments() {
        ((this._element.style.paddingLeft = ``),
          (this._element.style.paddingRight = ``));
      }
      static jQueryInterface(e, t) {
        return this.each(function () {
          let n = ci.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (n[e] === void 0) throw TypeError(`No method named "${e}"`);
            n[e](t);
          }
        });
      }
    }
    (N.on(document, ni, `[data-bs-toggle="modal"]`, function (e) {
      let t = I.getElementFromSelector(this);
      ([`A`, `AREA`].includes(this.tagName) && e.preventDefault(),
        N.one(t, Xr, (e) => {
          e.defaultPrevented ||
            N.one(t, Yr, () => {
              u(this) && this.focus();
            });
        }));
      let n = I.findOne(`.modal.show`);
      (n && ci.getInstance(n).hide(), ci.getOrCreateInstance(t).toggle(this));
    }),
      fe(ci),
      y(ci));
    let Q = `.bs.offcanvas`,
      li = `.data-api`,
      ui = `load${Q}${li}`,
      di = `show`,
      fi = `showing`,
      pi = `hiding`,
      mi = `.offcanvas.show`,
      hi = `show${Q}`,
      gi = `shown${Q}`,
      _i = `hide${Q}`,
      vi = `hidePrevented${Q}`,
      yi = `hidden${Q}`,
      bi = `resize${Q}`,
      xi = `click${Q}${li}`,
      Si = `keydown.dismiss${Q}`,
      Ci = { backdrop: !0, keyboard: !0, scroll: !1 },
      wi = {
        backdrop: `(boolean|string)`,
        keyboard: `boolean`,
        scroll: `boolean`,
      };
    class $ extends F {
      constructor(e, t) {
        (super(e, t),
          (this._isShown = !1),
          (this._backdrop = this._initializeBackDrop()),
          (this._focustrap = this._initializeFocusTrap()),
          this._addEventListeners());
      }
      static get Default() {
        return Ci;
      }
      static get DefaultType() {
        return wi;
      }
      static get NAME() {
        return `offcanvas`;
      }
      toggle(e) {
        return this._isShown ? this.hide() : this.show(e);
      }
      show(e) {
        this._isShown ||
          N.trigger(this._element, hi, { relatedTarget: e }).defaultPrevented ||
          ((this._isShown = !0),
          this._backdrop.show(),
          this._config.scroll || new Kr().hide(),
          this._element.setAttribute(`aria-modal`, !0),
          this._element.setAttribute(`role`, `dialog`),
          this._element.classList.add(fi),
          this._queueCallback(
            () => {
              ((!this._config.scroll || this._config.backdrop) &&
                this._focustrap.activate(),
                this._element.classList.add(di),
                this._element.classList.remove(fi),
                N.trigger(this._element, gi, { relatedTarget: e }));
            },
            this._element,
            !0
          ));
      }
      hide() {
        !this._isShown ||
          N.trigger(this._element, _i).defaultPrevented ||
          (this._focustrap.deactivate(),
          this._element.blur(),
          (this._isShown = !1),
          this._element.classList.add(pi),
          this._backdrop.hide(),
          this._queueCallback(
            () => {
              (this._element.classList.remove(di, pi),
                this._element.removeAttribute(`aria-modal`),
                this._element.removeAttribute(`role`),
                this._config.scroll || new Kr().reset(),
                N.trigger(this._element, yi));
            },
            this._element,
            !0
          ));
      }
      dispose() {
        (this._backdrop.dispose(),
          this._focustrap.deactivate(),
          super.dispose());
      }
      _initializeBackDrop() {
        let e = () => {
            if (this._config.backdrop === `static`) {
              N.trigger(this._element, vi);
              return;
            }
            this.hide();
          },
          t = !!this._config.backdrop;
        return new Pr({
          className: `offcanvas-backdrop`,
          isVisible: t,
          isAnimated: !0,
          rootElement: this._element.parentNode,
          clickCallback: t ? e : null,
        });
      }
      _initializeFocusTrap() {
        return new Vr({ trapElement: this._element });
      }
      _addEventListeners() {
        N.on(this._element, Si, (e) => {
          if (e.key === `Escape`) {
            if (this._config.keyboard) {
              this.hide();
              return;
            }
            N.trigger(this._element, vi);
          }
        });
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = $.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (t[e] === void 0 || e.startsWith(`_`) || e === `constructor`)
              throw TypeError(`No method named "${e}"`);
            t[e](this);
          }
        });
      }
    }
    (N.on(document, xi, `[data-bs-toggle="offcanvas"]`, function (e) {
      let t = I.getElementFromSelector(this);
      if (([`A`, `AREA`].includes(this.tagName) && e.preventDefault(), d(this)))
        return;
      N.one(t, yi, () => {
        u(this) && this.focus();
      });
      let n = I.findOne(mi);
      (n && n !== t && $.getInstance(n).hide(),
        $.getOrCreateInstance(t).toggle(this));
    }),
      N.on(window, ui, () => {
        for (let e of I.find(mi)) $.getOrCreateInstance(e).show();
      }),
      N.on(window, bi, () => {
        for (let e of I.find(`[aria-modal][class*=show][class*=offcanvas-]`))
          getComputedStyle(e).position !== `fixed` &&
            $.getOrCreateInstance(e).hide();
      }),
      fe($),
      y($));
    let Ti = {
        '*': [`class`, `dir`, `id`, `lang`, `role`, /^aria-[\w-]*$/i],
        a: [`target`, `href`, `title`, `rel`],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        dd: [],
        div: [],
        dl: [],
        dt: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: [`src`, `srcset`, `alt`, `title`, `width`, `height`],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: [],
      },
      Ei = new Set([
        `background`,
        `cite`,
        `href`,
        `itemtype`,
        `longdesc`,
        `poster`,
        `src`,
        `xlink:href`,
      ]),
      Di = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i,
      Oi = (e, t) => {
        let n = e.nodeName.toLowerCase();
        return t.includes(n)
          ? Ei.has(n)
            ? !!Di.test(e.nodeValue)
            : !0
          : t.filter((e) => e instanceof RegExp).some((e) => e.test(n));
      };
    function ki(e, t, n) {
      if (!e.length) return e;
      if (n && typeof n == `function`) return n(e);
      let r = new window.DOMParser().parseFromString(e, `text/html`),
        i = [].concat(...r.body.querySelectorAll(`*`));
      for (let e of i) {
        let n = e.nodeName.toLowerCase();
        if (!Object.keys(t).includes(n)) {
          e.remove();
          continue;
        }
        let r = [].concat(...e.attributes),
          i = [].concat(t[`*`] || [], t[n] || []);
        for (let t of r) Oi(t, i) || e.removeAttribute(t.nodeName);
      }
      return r.body.innerHTML;
    }
    let Ai = {
        allowList: Ti,
        content: {},
        extraClass: ``,
        html: !1,
        sanitize: !0,
        sanitizeFn: null,
        template: `<div></div>`,
      },
      ji = {
        allowList: `object`,
        content: `object`,
        extraClass: `(string|function)`,
        html: `boolean`,
        sanitize: `boolean`,
        sanitizeFn: `(null|function)`,
        template: `string`,
      },
      Mi = {
        entry: `(string|element|function|null)`,
        selector: `(string|element)`,
      };
    class Ni extends ue {
      constructor(e) {
        (super(), (this._config = this._getConfig(e)));
      }
      static get Default() {
        return Ai;
      }
      static get DefaultType() {
        return ji;
      }
      static get NAME() {
        return `TemplateFactory`;
      }
      getContent() {
        return Object.values(this._config.content)
          .map((e) => this._resolvePossibleFunction(e))
          .filter(Boolean);
      }
      hasContent() {
        return this.getContent().length > 0;
      }
      changeContent(e) {
        return (
          this._checkContent(e),
          (this._config.content = { ...this._config.content, ...e }),
          this
        );
      }
      toHtml() {
        let e = document.createElement(`div`);
        e.innerHTML = this._maybeSanitize(this._config.template);
        for (let [t, n] of Object.entries(this._config.content))
          this._setContent(e, n, t);
        let t = e.children[0],
          n = this._resolvePossibleFunction(this._config.extraClass);
        return (n && t.classList.add(...n.split(` `)), t);
      }
      _typeCheckConfig(e) {
        (super._typeCheckConfig(e), this._checkContent(e.content));
      }
      _checkContent(e) {
        for (let [t, n] of Object.entries(e))
          super._typeCheckConfig({ selector: t, entry: n }, Mi);
      }
      _setContent(e, t, n) {
        let r = I.findOne(n, e);
        if (r) {
          if (((t = this._resolvePossibleFunction(t)), !t)) {
            r.remove();
            return;
          }
          if (c(t)) {
            this._putElementInTemplate(l(t), r);
            return;
          }
          if (this._config.html) {
            r.innerHTML = this._maybeSanitize(t);
            return;
          }
          r.textContent = t;
        }
      }
      _maybeSanitize(e) {
        return this._config.sanitize
          ? ki(e, this._config.allowList, this._config.sanitizeFn)
          : e;
      }
      _resolvePossibleFunction(e) {
        return b(e, [void 0, this]);
      }
      _putElementInTemplate(e, t) {
        if (this._config.html) {
          ((t.innerHTML = ``), t.append(e));
          return;
        }
        t.textContent = e.textContent;
      }
    }
    let Pi = new Set([`sanitize`, `allowList`, `sanitizeFn`]),
      Fi = `fade`,
      Ii = `show`,
      Li = `.modal`,
      Ri = `hide.bs.modal`,
      zi = `hover`,
      Bi = `focus`,
      Vi = `click`,
      Hi = {
        AUTO: `auto`,
        TOP: `top`,
        RIGHT: v() ? `left` : `right`,
        BOTTOM: `bottom`,
        LEFT: v() ? `right` : `left`,
      },
      Ui = {
        allowList: Ti,
        animation: !0,
        boundary: `clippingParents`,
        container: !1,
        customClass: ``,
        delay: 0,
        fallbackPlacements: [`top`, `right`, `bottom`, `left`],
        html: !1,
        offset: [0, 6],
        placement: `top`,
        popperConfig: null,
        sanitize: !0,
        sanitizeFn: null,
        selector: !1,
        template: `<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>`,
        title: ``,
        trigger: `hover focus`,
      },
      Wi = {
        allowList: `object`,
        animation: `boolean`,
        boundary: `(string|element)`,
        container: `(string|element|boolean)`,
        customClass: `(string|function)`,
        delay: `(number|object)`,
        fallbackPlacements: `array`,
        html: `boolean`,
        offset: `(array|string|function)`,
        placement: `(string|function)`,
        popperConfig: `(null|object|function)`,
        sanitize: `boolean`,
        sanitizeFn: `(null|function)`,
        selector: `(string|boolean)`,
        template: `string`,
        title: `(string|element|function)`,
        trigger: `string`,
      };
    class Gi extends F {
      constructor(e, t) {
        if (or === void 0)
          throw TypeError(
            `Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)`
          );
        (super(e, t),
          (this._isEnabled = !0),
          (this._timeout = 0),
          (this._isHovered = null),
          (this._activeTrigger = {}),
          (this._popper = null),
          (this._templateFactory = null),
          (this._newContent = null),
          (this.tip = null),
          this._setListeners(),
          this._config.selector || this._fixTitle());
      }
      static get Default() {
        return Ui;
      }
      static get DefaultType() {
        return Wi;
      }
      static get NAME() {
        return `tooltip`;
      }
      enable() {
        this._isEnabled = !0;
      }
      disable() {
        this._isEnabled = !1;
      }
      toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
      toggle() {
        if (this._isEnabled) {
          if (this._isShown()) {
            this._leave();
            return;
          }
          this._enter();
        }
      }
      dispose() {
        (clearTimeout(this._timeout),
          N.off(this._element.closest(Li), Ri, this._hideModalHandler),
          this._element.getAttribute(`data-bs-original-title`) &&
            this._element.setAttribute(
              `title`,
              this._element.getAttribute(`data-bs-original-title`)
            ),
          this._disposePopper(),
          super.dispose());
      }
      show() {
        if (this._element.style.display === `none`)
          throw Error(`Please use show on visible elements`);
        if (!(this._isWithContent() && this._isEnabled)) return;
        let e = N.trigger(this._element, this.constructor.eventName(`show`)),
          t = (
            f(this._element) || this._element.ownerDocument.documentElement
          ).contains(this._element);
        if (e.defaultPrevented || !t) return;
        this._disposePopper();
        let n = this._getTipElement();
        this._element.setAttribute(`aria-describedby`, n.getAttribute(`id`));
        let { container: r } = this._config;
        if (
          (this._element.ownerDocument.documentElement.contains(this.tip) ||
            (r.append(n),
            N.trigger(this._element, this.constructor.eventName(`inserted`))),
          (this._popper = this._createPopper(n)),
          n.classList.add(Ii),
          `ontouchstart` in document.documentElement)
        )
          for (let e of [].concat(...document.body.children))
            N.on(e, `mouseover`, p);
        this._queueCallback(
          () => {
            (N.trigger(this._element, this.constructor.eventName(`shown`)),
              this._isHovered === !1 && this._leave(),
              (this._isHovered = !1));
          },
          this.tip,
          this._isAnimated()
        );
      }
      hide() {
        if (
          !(
            !this._isShown() ||
            N.trigger(this._element, this.constructor.eventName(`hide`))
              .defaultPrevented
          )
        ) {
          if (
            (this._getTipElement().classList.remove(Ii),
            `ontouchstart` in document.documentElement)
          )
            for (let e of [].concat(...document.body.children))
              N.off(e, `mouseover`, p);
          ((this._activeTrigger[Vi] = !1),
            (this._activeTrigger[Bi] = !1),
            (this._activeTrigger[zi] = !1),
            (this._isHovered = null),
            this._queueCallback(
              () => {
                this._isWithActiveTrigger() ||
                  (this._isHovered || this._disposePopper(),
                  this._element.removeAttribute(`aria-describedby`),
                  N.trigger(
                    this._element,
                    this.constructor.eventName(`hidden`)
                  ));
              },
              this.tip,
              this._isAnimated()
            ));
        }
      }
      update() {
        this._popper && this._popper.update();
      }
      _isWithContent() {
        return !!this._getTitle();
      }
      _getTipElement() {
        return (
          (this.tip ||= this._createTipElement(
            this._newContent || this._getContentForTemplate()
          )),
          this.tip
        );
      }
      _createTipElement(e) {
        let t = this._getTemplateFactory(e).toHtml();
        if (!t) return null;
        (t.classList.remove(Fi, Ii),
          t.classList.add(`bs-${this.constructor.NAME}-auto`));
        let n = a(this.constructor.NAME).toString();
        return (
          t.setAttribute(`id`, n),
          this._isAnimated() && t.classList.add(Fi),
          t
        );
      }
      setContent(e) {
        ((this._newContent = e),
          this._isShown() && (this._disposePopper(), this.show()));
      }
      _getTemplateFactory(e) {
        return (
          this._templateFactory
            ? this._templateFactory.changeContent(e)
            : (this._templateFactory = new Ni({
                ...this._config,
                content: e,
                extraClass: this._resolvePossibleFunction(
                  this._config.customClass
                ),
              })),
          this._templateFactory
        );
      }
      _getContentForTemplate() {
        return { '.tooltip-inner': this._getTitle() };
      }
      _getTitle() {
        return (
          this._resolvePossibleFunction(this._config.title) ||
          this._element.getAttribute(`data-bs-original-title`)
        );
      }
      _initializeOnDelegatedTarget(e) {
        return this.constructor.getOrCreateInstance(
          e.delegateTarget,
          this._getDelegateConfig()
        );
      }
      _isAnimated() {
        return (
          this._config.animation ||
          (this.tip && this.tip.classList.contains(Fi))
        );
      }
      _isShown() {
        return this.tip && this.tip.classList.contains(Ii);
      }
      _createPopper(e) {
        let t =
          Hi[b(this._config.placement, [this, e, this._element]).toUpperCase()];
        return ar(this._element, e, this._getPopperConfig(t));
      }
      _getOffset() {
        let { offset: e } = this._config;
        return typeof e == `string`
          ? e.split(`,`).map((e) => Number.parseInt(e, 10))
          : typeof e == `function`
            ? (t) => e(t, this._element)
            : e;
      }
      _resolvePossibleFunction(e) {
        return b(e, [this._element, this._element]);
      }
      _getPopperConfig(e) {
        let t = {
          placement: e,
          modifiers: [
            {
              name: `flip`,
              options: { fallbackPlacements: this._config.fallbackPlacements },
            },
            { name: `offset`, options: { offset: this._getOffset() } },
            {
              name: `preventOverflow`,
              options: { boundary: this._config.boundary },
            },
            {
              name: `arrow`,
              options: { element: `.${this.constructor.NAME}-arrow` },
            },
            {
              name: `preSetPlacement`,
              enabled: !0,
              phase: `beforeMain`,
              fn: (e) => {
                this._getTipElement().setAttribute(
                  `data-popper-placement`,
                  e.state.placement
                );
              },
            },
          ],
        };
        return { ...t, ...b(this._config.popperConfig, [void 0, t]) };
      }
      _setListeners() {
        let e = this._config.trigger.split(` `);
        for (let t of e)
          if (t === `click`)
            N.on(
              this._element,
              this.constructor.eventName(`click`),
              this._config.selector,
              (e) => {
                let t = this._initializeOnDelegatedTarget(e);
                ((t._activeTrigger[Vi] = !(
                  t._isShown() && t._activeTrigger[Vi]
                )),
                  t.toggle());
              }
            );
          else if (t !== `manual`) {
            let e =
                t === zi
                  ? this.constructor.eventName(`mouseenter`)
                  : this.constructor.eventName(`focusin`),
              n =
                t === zi
                  ? this.constructor.eventName(`mouseleave`)
                  : this.constructor.eventName(`focusout`);
            (N.on(this._element, e, this._config.selector, (e) => {
              let t = this._initializeOnDelegatedTarget(e);
              ((t._activeTrigger[e.type === `focusin` ? Bi : zi] = !0),
                t._enter());
            }),
              N.on(this._element, n, this._config.selector, (e) => {
                let t = this._initializeOnDelegatedTarget(e);
                ((t._activeTrigger[e.type === `focusout` ? Bi : zi] =
                  t._element.contains(e.relatedTarget)),
                  t._leave());
              }));
          }
        ((this._hideModalHandler = () => {
          this._element && this.hide();
        }),
          N.on(this._element.closest(Li), Ri, this._hideModalHandler));
      }
      _fixTitle() {
        let e = this._element.getAttribute(`title`);
        e &&
          (!this._element.getAttribute(`aria-label`) &&
            !this._element.textContent.trim() &&
            this._element.setAttribute(`aria-label`, e),
          this._element.setAttribute(`data-bs-original-title`, e),
          this._element.removeAttribute(`title`));
      }
      _enter() {
        if (this._isShown() || this._isHovered) {
          this._isHovered = !0;
          return;
        }
        ((this._isHovered = !0),
          this._setTimeout(() => {
            this._isHovered && this.show();
          }, this._config.delay.show));
      }
      _leave() {
        this._isWithActiveTrigger() ||
          ((this._isHovered = !1),
          this._setTimeout(() => {
            this._isHovered || this.hide();
          }, this._config.delay.hide));
      }
      _setTimeout(e, t) {
        (clearTimeout(this._timeout), (this._timeout = setTimeout(e, t)));
      }
      _isWithActiveTrigger() {
        return Object.values(this._activeTrigger).includes(!0);
      }
      _getConfig(e) {
        let t = P.getDataAttributes(this._element);
        for (let e of Object.keys(t)) Pi.has(e) && delete t[e];
        return (
          (e = { ...t, ...(typeof e == `object` && e ? e : {}) }),
          (e = this._mergeConfigObj(e)),
          (e = this._configAfterMerge(e)),
          this._typeCheckConfig(e),
          e
        );
      }
      _configAfterMerge(e) {
        return (
          (e.container = e.container === !1 ? document.body : l(e.container)),
          typeof e.delay == `number` &&
            (e.delay = { show: e.delay, hide: e.delay }),
          typeof e.title == `number` && (e.title = e.title.toString()),
          typeof e.content == `number` && (e.content = e.content.toString()),
          e
        );
      }
      _getDelegateConfig() {
        let e = {};
        for (let [t, n] of Object.entries(this._config))
          this.constructor.Default[t] !== n && (e[t] = n);
        return ((e.selector = !1), (e.trigger = `manual`), e);
      }
      _disposePopper() {
        ((this._popper &&= (this._popper.destroy(), null)),
          (this.tip &&= (this.tip.remove(), null)));
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = Gi.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (t[e] === void 0) throw TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    y(Gi);
    let Ki = {
        ...Gi.Default,
        content: ``,
        offset: [0, 8],
        placement: `right`,
        template: `<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>`,
        trigger: `click`,
      },
      qi = { ...Gi.DefaultType, content: `(null|string|element|function)` };
    class Ji extends Gi {
      static get Default() {
        return Ki;
      }
      static get DefaultType() {
        return qi;
      }
      static get NAME() {
        return `popover`;
      }
      _isWithContent() {
        return this._getTitle() || this._getContent();
      }
      _getContentForTemplate() {
        return {
          '.popover-header': this._getTitle(),
          '.popover-body': this._getContent(),
        };
      }
      _getContent() {
        return this._resolvePossibleFunction(this._config.content);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = Ji.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (t[e] === void 0) throw TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    y(Ji);
    let Yi = `.bs.scrollspy`,
      Xi = `activate${Yi}`,
      Zi = `click${Yi}`,
      Qi = `load${Yi}.data-api`,
      $i = `active`,
      ea = `[href]`,
      ta = `.nav-link`,
      na = `${ta}, .nav-item > ${ta}, .list-group-item`,
      ra = {
        offset: null,
        rootMargin: `0px 0px -25%`,
        smoothScroll: !1,
        target: null,
        threshold: [0.1, 0.5, 1],
      },
      ia = {
        offset: `(number|null)`,
        rootMargin: `string`,
        smoothScroll: `boolean`,
        target: `element`,
        threshold: `array`,
      };
    class aa extends F {
      constructor(e, t) {
        (super(e, t),
          (this._targetLinks = new Map()),
          (this._observableSections = new Map()),
          (this._rootElement =
            getComputedStyle(this._element).overflowY === `visible`
              ? null
              : this._element),
          (this._activeTarget = null),
          (this._observer = null),
          (this._previousScrollData = {
            visibleEntryTop: 0,
            parentScrollTop: 0,
          }),
          this.refresh());
      }
      static get Default() {
        return ra;
      }
      static get DefaultType() {
        return ia;
      }
      static get NAME() {
        return `scrollspy`;
      }
      refresh() {
        (this._initializeTargetsAndObservables(),
          this._maybeEnableSmoothScroll(),
          this._observer
            ? this._observer.disconnect()
            : (this._observer = this._getNewObserver()));
        for (let e of this._observableSections.values())
          this._observer.observe(e);
      }
      dispose() {
        (this._observer.disconnect(), super.dispose());
      }
      _configAfterMerge(e) {
        return (
          (e.target = l(e.target) || document.body),
          (e.rootMargin = e.offset ? `${e.offset}px 0px -30%` : e.rootMargin),
          typeof e.threshold == `string` &&
            (e.threshold = e.threshold
              .split(`,`)
              .map((e) => Number.parseFloat(e))),
          e
        );
      }
      _maybeEnableSmoothScroll() {
        this._config.smoothScroll &&
          (N.off(this._config.target, Zi),
          N.on(this._config.target, Zi, ea, (e) => {
            let t = this._observableSections.get(e.target.hash);
            if (t) {
              e.preventDefault();
              let n = this._rootElement || window,
                r = t.offsetTop - this._element.offsetTop;
              if (n.scrollTo) {
                n.scrollTo({ top: r, behavior: `smooth` });
                return;
              }
              n.scrollTop = r;
            }
          }));
      }
      _getNewObserver() {
        let e = {
          root: this._rootElement,
          threshold: this._config.threshold,
          rootMargin: this._config.rootMargin,
        };
        return new IntersectionObserver((e) => this._observerCallback(e), e);
      }
      _observerCallback(e) {
        let t = (e) => this._targetLinks.get(`#${e.target.id}`),
          n = (e) => {
            ((this._previousScrollData.visibleEntryTop = e.target.offsetTop),
              this._process(t(e)));
          },
          r = (this._rootElement || document.documentElement).scrollTop,
          i = r >= this._previousScrollData.parentScrollTop;
        this._previousScrollData.parentScrollTop = r;
        for (let a of e) {
          if (!a.isIntersecting) {
            ((this._activeTarget = null), this._clearActiveClass(t(a)));
            continue;
          }
          let e =
            a.target.offsetTop >= this._previousScrollData.visibleEntryTop;
          if (i && e) {
            if ((n(a), !r)) return;
            continue;
          }
          !i && !e && n(a);
        }
      }
      _initializeTargetsAndObservables() {
        ((this._targetLinks = new Map()),
          (this._observableSections = new Map()));
        let e = I.find(ea, this._config.target);
        for (let t of e) {
          if (!t.hash || d(t)) continue;
          let e = I.findOne(decodeURI(t.hash), this._element);
          u(e) &&
            (this._targetLinks.set(decodeURI(t.hash), t),
            this._observableSections.set(t.hash, e));
        }
      }
      _process(e) {
        this._activeTarget !== e &&
          (this._clearActiveClass(this._config.target),
          (this._activeTarget = e),
          e.classList.add($i),
          this._activateParents(e),
          N.trigger(this._element, Xi, { relatedTarget: e }));
      }
      _activateParents(e) {
        if (e.classList.contains(`dropdown-item`)) {
          I.findOne(`.dropdown-toggle`, e.closest(`.dropdown`)).classList.add(
            $i
          );
          return;
        }
        for (let t of I.parents(e, `.nav, .list-group`))
          for (let e of I.prev(t, na)) e.classList.add($i);
      }
      _clearActiveClass(e) {
        e.classList.remove($i);
        let t = I.find(`${ea}.${$i}`, e);
        for (let e of t) e.classList.remove($i);
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = aa.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (t[e] === void 0 || e.startsWith(`_`) || e === `constructor`)
              throw TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    (N.on(window, Qi, () => {
      for (let e of I.find(`[data-bs-spy="scroll"]`)) aa.getOrCreateInstance(e);
    }),
      y(aa));
    let oa = `.bs.tab`,
      sa = `hide${oa}`,
      ca = `hidden${oa}`,
      la = `show${oa}`,
      ua = `shown${oa}`,
      da = `click${oa}`,
      fa = `keydown${oa}`,
      pa = `load${oa}`,
      ma = `ArrowRight`,
      ha = `ArrowDown`,
      ga = `Home`,
      _a = `active`,
      va = `fade`,
      ya = `show`,
      ba = `.dropdown-toggle`,
      xa = `:not(${ba})`,
      Sa = `.nav-link${xa}, .list-group-item${xa}, [role="tab"]${xa}`,
      Ca = `[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]`,
      wa = `${Sa}, ${Ca}`,
      Ta = `.${_a}[data-bs-toggle="tab"], .${_a}[data-bs-toggle="pill"], .${_a}[data-bs-toggle="list"]`;
    class Ea extends F {
      constructor(e) {
        (super(e),
          (this._parent = this._element.closest(
            `.list-group, .nav, [role="tablist"]`
          )),
          this._parent &&
            (this._setInitialAttributes(this._parent, this._getChildren()),
            N.on(this._element, fa, (e) => this._keydown(e))));
      }
      static get NAME() {
        return `tab`;
      }
      show() {
        let e = this._element;
        if (this._elemIsActive(e)) return;
        let t = this._getActiveElem(),
          n = t ? N.trigger(t, sa, { relatedTarget: e }) : null;
        N.trigger(e, la, { relatedTarget: t }).defaultPrevented ||
          (n && n.defaultPrevented) ||
          (this._deactivate(t, e), this._activate(e, t));
      }
      _activate(e, t) {
        e &&
          (e.classList.add(_a),
          this._activate(I.getElementFromSelector(e)),
          this._queueCallback(
            () => {
              if (e.getAttribute(`role`) !== `tab`) {
                e.classList.add(ya);
                return;
              }
              (e.removeAttribute(`tabindex`),
                e.setAttribute(`aria-selected`, !0),
                this._toggleDropDown(e, !0),
                N.trigger(e, ua, { relatedTarget: t }));
            },
            e,
            e.classList.contains(va)
          ));
      }
      _deactivate(e, t) {
        e &&
          (e.classList.remove(_a),
          e.blur(),
          this._deactivate(I.getElementFromSelector(e)),
          this._queueCallback(
            () => {
              if (e.getAttribute(`role`) !== `tab`) {
                e.classList.remove(ya);
                return;
              }
              (e.setAttribute(`aria-selected`, !1),
                e.setAttribute(`tabindex`, `-1`),
                this._toggleDropDown(e, !1),
                N.trigger(e, ca, { relatedTarget: t }));
            },
            e,
            e.classList.contains(va)
          ));
      }
      _keydown(e) {
        if (![`ArrowLeft`, ma, `ArrowUp`, ha, ga, `End`].includes(e.key))
          return;
        (e.stopPropagation(), e.preventDefault());
        let t = this._getChildren().filter((e) => !d(e)),
          n;
        if ([ga, `End`].includes(e.key)) n = t[e.key === ga ? 0 : t.length - 1];
        else {
          let r = [ma, ha].includes(e.key);
          n = S(t, e.target, r, !0);
        }
        n && (n.focus({ preventScroll: !0 }), Ea.getOrCreateInstance(n).show());
      }
      _getChildren() {
        return I.find(wa, this._parent);
      }
      _getActiveElem() {
        return this._getChildren().find((e) => this._elemIsActive(e)) || null;
      }
      _setInitialAttributes(e, t) {
        this._setAttributeIfNotExists(e, `role`, `tablist`);
        for (let e of t) this._setInitialAttributesOnChild(e);
      }
      _setInitialAttributesOnChild(e) {
        e = this._getInnerElement(e);
        let t = this._elemIsActive(e),
          n = this._getOuterElement(e);
        (e.setAttribute(`aria-selected`, t),
          n !== e && this._setAttributeIfNotExists(n, `role`, `presentation`),
          t || e.setAttribute(`tabindex`, `-1`),
          this._setAttributeIfNotExists(e, `role`, `tab`),
          this._setInitialAttributesOnTargetPanel(e));
      }
      _setInitialAttributesOnTargetPanel(e) {
        let t = I.getElementFromSelector(e);
        t &&
          (this._setAttributeIfNotExists(t, `role`, `tabpanel`),
          e.id &&
            this._setAttributeIfNotExists(t, `aria-labelledby`, `${e.id}`));
      }
      _toggleDropDown(e, t) {
        let n = this._getOuterElement(e);
        if (!n.classList.contains(`dropdown`)) return;
        let r = (e, r) => {
          let i = I.findOne(e, n);
          i && i.classList.toggle(r, t);
        };
        (r(ba, _a),
          r(`.dropdown-menu`, ya),
          n.setAttribute(`aria-expanded`, t));
      }
      _setAttributeIfNotExists(e, t, n) {
        e.hasAttribute(t) || e.setAttribute(t, n);
      }
      _elemIsActive(e) {
        return e.classList.contains(_a);
      }
      _getInnerElement(e) {
        return e.matches(wa) ? e : I.findOne(wa, e);
      }
      _getOuterElement(e) {
        return e.closest(`.nav-item, .list-group-item`) || e;
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = Ea.getOrCreateInstance(this);
          if (typeof e == `string`) {
            if (t[e] === void 0 || e.startsWith(`_`) || e === `constructor`)
              throw TypeError(`No method named "${e}"`);
            t[e]();
          }
        });
      }
    }
    (N.on(document, da, Ca, function (e) {
      ([`A`, `AREA`].includes(this.tagName) && e.preventDefault(),
        !d(this) && Ea.getOrCreateInstance(this).show());
    }),
      N.on(window, pa, () => {
        for (let e of I.find(Ta)) Ea.getOrCreateInstance(e);
      }),
      y(Ea));
    let Da = `.bs.toast`,
      Oa = `mouseover${Da}`,
      ka = `mouseout${Da}`,
      Aa = `focusin${Da}`,
      ja = `focusout${Da}`,
      Ma = `hide${Da}`,
      Na = `hidden${Da}`,
      Pa = `show${Da}`,
      Fa = `shown${Da}`,
      Ia = `hide`,
      La = `show`,
      Ra = `showing`,
      za = { animation: `boolean`, autohide: `boolean`, delay: `number` },
      Ba = { animation: !0, autohide: !0, delay: 5e3 };
    class Va extends F {
      constructor(e, t) {
        (super(e, t),
          (this._timeout = null),
          (this._hasMouseInteraction = !1),
          (this._hasKeyboardInteraction = !1),
          this._setListeners());
      }
      static get Default() {
        return Ba;
      }
      static get DefaultType() {
        return za;
      }
      static get NAME() {
        return `toast`;
      }
      show() {
        N.trigger(this._element, Pa).defaultPrevented ||
          (this._clearTimeout(),
          this._config.animation && this._element.classList.add(`fade`),
          this._element.classList.remove(Ia),
          m(this._element),
          this._element.classList.add(La, Ra),
          this._queueCallback(
            () => {
              (this._element.classList.remove(Ra),
                N.trigger(this._element, Fa),
                this._maybeScheduleHide());
            },
            this._element,
            this._config.animation
          ));
      }
      hide() {
        !this.isShown() ||
          N.trigger(this._element, Ma).defaultPrevented ||
          (this._element.classList.add(Ra),
          this._queueCallback(
            () => {
              (this._element.classList.add(Ia),
                this._element.classList.remove(Ra, La),
                N.trigger(this._element, Na));
            },
            this._element,
            this._config.animation
          ));
      }
      dispose() {
        (this._clearTimeout(),
          this.isShown() && this._element.classList.remove(La),
          super.dispose());
      }
      isShown() {
        return this._element.classList.contains(La);
      }
      _maybeScheduleHide() {
        this._config.autohide &&
          (this._hasMouseInteraction ||
            this._hasKeyboardInteraction ||
            (this._timeout = setTimeout(() => {
              this.hide();
            }, this._config.delay)));
      }
      _onInteraction(e, t) {
        switch (e.type) {
          case `mouseover`:
          case `mouseout`:
            this._hasMouseInteraction = t;
            break;
          case `focusin`:
          case `focusout`:
            this._hasKeyboardInteraction = t;
            break;
        }
        if (t) {
          this._clearTimeout();
          return;
        }
        let n = e.relatedTarget;
        this._element === n ||
          this._element.contains(n) ||
          this._maybeScheduleHide();
      }
      _setListeners() {
        (N.on(this._element, Oa, (e) => this._onInteraction(e, !0)),
          N.on(this._element, ka, (e) => this._onInteraction(e, !1)),
          N.on(this._element, Aa, (e) => this._onInteraction(e, !0)),
          N.on(this._element, ja, (e) => this._onInteraction(e, !1)));
      }
      _clearTimeout() {
        (clearTimeout(this._timeout), (this._timeout = null));
      }
      static jQueryInterface(e) {
        return this.each(function () {
          let t = Va.getOrCreateInstance(this, e);
          if (typeof e == `string`) {
            if (t[e] === void 0) throw TypeError(`No method named "${e}"`);
            t[e](this);
          }
        });
      }
    }
    return (
      fe(Va),
      y(Va),
      {
        Alert: ge,
        Button: R,
        Carousel: qe,
        Collapse: st,
        Dropdown: X,
        Modal: ci,
        Offcanvas: $,
        Popover: Ji,
        ScrollSpy: aa,
        Tab: Ea,
        Toast: Va,
        Tooltip: Gi,
      }
    );
  });
});
function r() {
  let e = `
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">Compre Aqui!</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="produtos.html">Produtos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contato.html">Contato</a>
            </li>
          </ul>
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="carrinho.html">
                <i class="bi bi-cart3"></i> Carrinho
                <span class="contador-carrinho badge bg-primary">0</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
    t = document.getElementById(`navbar-container`);
  t ? (t.innerHTML = e) : document.body.insertAdjacentHTML(`afterbegin`, e);
}
var i = e(() => {});
async function a() {
  try {
    let e = await fetch(s);
    if (!e.ok) throw Error(`Erro ao carregar depoimentos`);
    return await e.json();
  } catch (e) {
    return (console.error(`Erro ao carregar depoimentos:`, e), []);
  }
}
async function o(e) {
  try {
    let t = await fetch(c, {
      method: `POST`,
      headers: { 'Content-type': `application/json` },
      body: JSON.stringify(e),
    });
    if (t.status === 201) return { success: !0 };
    throw Error(`Status ${t.status}`);
  } catch (e) {
    return (
      console.error(`Erro ao enviar formulário:`, e),
      { success: !1, error: e.message }
    );
  }
}
var s,
  c,
  l = e(() => {
    ((s = `https://jsonplaceholder.typicode.com/comments?_limit=3`),
      (c = `https://jsonplaceholder.typicode.com/posts`));
  });
function u(e, t) {
  ((t.innerHTML = ``),
    e.forEach((e) => {
      t.innerHTML += `
            <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${e.email}</h6>
                        <p class="card-text">${e.body}</p>
                    </div>
                </div>
            </div>
        `;
    }));
}
function d(e, t, n = `success`) {
  e.innerHTML = ``;
  let r = document.createElement(`div`);
  ((r.className = `alert alert-${n} alert-dismissible fade show`),
    (r.role = `alert`),
    (r.innerHTML = `
        ${t}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `),
    e.appendChild(r),
    setTimeout(() => {
      r.parentNode && r.remove();
    }, 5e3));
}
function f() {
  let e = JSON.parse(localStorage.getItem(`carrinho`) || `[]`).reduce(
    (e, t) => e + Number(t.quantidade),
    0
  );
  document.querySelectorAll(`.contador-carrinho`).forEach((t) => {
    t.textContent = `${e}`;
  });
}
var p = e(() => {
    window.atualizarContadorCarrinho = f;
  }),
  m = e(() => {}),
  h = e(() => {}),
  g = e(() => {}),
  _ = e(() => {}),
  v = e(() => {}),
  y = t(() => {
    (m(), h(), g(), _(), v());
  });
t(() => {
  (n(), i(), l(), p(), y());
  function e(e, t = 1) {
    let n = Number(e);
    return Number.isFinite(n) && n > 0 ? n : t;
  }
  function t(t, n, r, i, a = null) {
    let o = a ?? e(document.getElementById(`produto_${i}`)?.value, 1);
    o < 1 && (o = 1);
    let s = JSON.parse(localStorage.getItem(`carrinho`) || `[]`),
      c = s.find((e) => e.nome === t);
    (c
      ? (c.quantidade += o)
      : s.push({ nome: t, preco: n, descricao: r, quantidade: o }),
      localStorage.setItem(`carrinho`, JSON.stringify(s)),
      f());
    let l = document.getElementById(`produto_${i}`);
    l && (l.value = `1`);
  }
  function s() {
    let t = Array.from(document.querySelectorAll(`.item-produto`)),
      n = Array.from(document.querySelectorAll(`.qtd-produto`)),
      r = t.reduce(
        (t, r, i) => (r.checked ? t + e(r.value) * e(n[i]?.value, 1) : t),
        0
      ),
      i = t.reduce((t, r, i) => (r.checked ? t + e(n[i]?.value, 1) : t), 0),
      a = JSON.parse(localStorage.getItem(`carrinho`) || `[]`);
    i += a.reduce((e, t) => e + t.quantidade, 0);
    let o = document.getElementById(`valor-total`);
    (o &&
      (o.textContent = r.toLocaleString(`pt-BR`, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })),
      document.querySelectorAll(`.contador-carrinho`).forEach((e) => {
        e.textContent = `${i}`;
      }));
  }
  function c(e) {
    (document.body.classList.remove(`tema-dark`, `tema-ocean`, `tema-forest`),
      e && document.body.classList.add(e),
      localStorage.setItem(`tema-selecionado`, e));
  }
  function m() {
    let e = document.getElementById(`seletor-tema`);
    if (!e) return;
    let t = localStorage.getItem(`tema-selecionado`) ?? ``;
    ((e.value = t),
      c(t),
      e.addEventListener(`change`, (e) => {
        let t = e.target;
        c(t.value);
      }));
  }
  document.addEventListener(`DOMContentLoaded`, async () => {
    (r(), m(), f(), s());
    let n = document.getElementById(`lista-depoimentos`);
    if (n)
      try {
        u(await a(), n);
      } catch (e) {
        (console.error(`Erro ao carregar depoimentos:`, e),
          (n.innerHTML = `<div class="alert alert-warning">Não foi possível carregar os depoimentos.</div>`));
      }
    let i = document.getElementById(`form-contato`),
      c = document.getElementById(`area-alertas`);
    (i &&
      c &&
      i.addEventListener(`submit`, async (e) => {
        e.preventDefault();
        let t = document.getElementById(`nome`)?.value.trim() || ``,
          n = document.getElementById(`email`)?.value.trim() || ``,
          r = document.getElementById(`mensagem`)?.value.trim() || ``;
        if (!t || !n || !r) {
          d(c, `Preencha todos os campos!`, `danger`);
          return;
        }
        (await o({ nome: t, email: n, body: r })).success
          ? (d(c, `✅ Mensagem enviada com sucesso!`, `success`), i.reset())
          : d(c, `❌ Erro ao enviar. Tente novamente.`, `danger`);
      }),
      document.querySelectorAll(`.adicionar-ao-carrinho`).forEach((n) => {
        n.addEventListener(`click`, () => {
          t(
            n.dataset.nome ?? ``,
            e(n.dataset.preco, 0),
            n.dataset.descricao ?? ``,
            n.dataset.id ?? ``
          );
        });
      }));
    let l = document.getElementById(`modalDetalheProduto`);
    l &&
      l.addEventListener(`show.bs.modal`, (n) => {
        let r = n.relatedTarget;
        if (!r) return;
        let i = r.getAttribute(`data-nome`) ?? ``,
          a = e(r.getAttribute(`data-preco`), 0),
          o = r.getAttribute(`data-descricao`) ?? ``,
          s = r.getAttribute(`data-id`) ?? ``,
          c = l.querySelector(`.modal-title`);
        c && (c.textContent = i);
        let u = l.querySelector(`.modal-body`);
        u &&
          (u.innerHTML = `
                <div class="text-center mb-3">
                    <img src="http://lorempixel.com.br/400/300" class="img-fluid rounded" alt="${i}">
                </div>
                <h5>Descrição</h5>
                <p>${o}</p>
                <h4 class="text-success mt-4">
                    ${a.toLocaleString(`pt-BR`, { style: `currency`, currency: `BRL` })}
                </h4>
                <div class="mt-3">
                    <label class="form-label">Quantidade:</label>
                    <input type="number" class="form-control w-25 d-inline-block" 
                           id="qtd-modal-${s}" value="1" min="1">
                </div>
            `);
        let f = l.querySelector(`.adicionar-ao-carrinho-modal`);
        if (!f) return;
        f.replaceWith(f.cloneNode(!0));
        let p = l.querySelector(`.adicionar-ao-carrinho-modal`);
        p &&
          p.addEventListener(`click`, () => {
            let n = e(document.getElementById(`qtd-modal-${s}`)?.value, 1);
            (n < 1 && (n = 1),
              t(i, a, o, s, n),
              bootstrap.Modal.getInstance(l).hide(),
              d(
                document.body,
                `✅ ${n} × ${i} adicionado(s) ao carrinho!`,
                `success`
              ));
          });
      });
  });
})();
