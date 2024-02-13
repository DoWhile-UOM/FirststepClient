/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatchMedia } from '../match-media';
import * as i0 from "@angular/core";
import * as i1 from "../../breakpoints/break-point-registry";
/**
 * MockMatchMedia mocks calls to the Window API matchMedia with a build of a simulated
 * MockMediaQueryListener. Methods are available to simulate an activation of a mediaQuery
 * range and to clearAll mediaQuery listeners.
 */
export class MockMatchMedia extends MatchMedia {
    constructor(_zone, _platformId, _document, _breakpoints) {
        super(_zone, _platformId, _document);
        this._breakpoints = _breakpoints;
        this.autoRegisterQueries = true; // Used for testing BreakPoint registrations
        this.useOverlaps = false; // Allow fallback to overlapping mediaQueries
    }
    /** Easy method to clear all listeners for all mediaQueries */
    clearAll() {
        this.registry.forEach((mql) => {
            mql.destroy();
        });
        this.registry.clear();
        this.useOverlaps = false;
    }
    /** Feature to support manual, simulated activation of a mediaQuery. */
    activate(mediaQuery, useOverlaps = this.useOverlaps) {
        mediaQuery = this._validateQuery(mediaQuery);
        if (useOverlaps || !this.isActive(mediaQuery)) {
            this._deactivateAll();
            this._registerMediaQuery(mediaQuery);
            this._activateWithOverlaps(mediaQuery, useOverlaps);
        }
        return this.hasActivated;
    }
    /** Converts an optional mediaQuery alias to a specific, valid mediaQuery */
    _validateQuery(queryOrAlias) {
        const bp = this._breakpoints.findByAlias(queryOrAlias);
        return bp?.mediaQuery ?? queryOrAlias;
    }
    /**
     * Manually onMediaChange any overlapping mediaQueries to simulate
     * similar functionality in the window.matchMedia()
     */
    _activateWithOverlaps(mediaQuery, useOverlaps) {
        if (useOverlaps) {
            const bp = this._breakpoints.findByQuery(mediaQuery);
            const alias = bp?.alias ?? 'unknown';
            // Simulate activation of overlapping lt-<XXX> ranges
            switch (alias) {
                case 'lg':
                    this._activateByAlias(['lt-xl']);
                    break;
                case 'md':
                    this._activateByAlias(['lt-xl', 'lt-lg']);
                    break;
                case 'sm':
                    this._activateByAlias(['lt-xl', 'lt-lg', 'lt-md']);
                    break;
                case 'xs':
                    this._activateByAlias(['lt-xl', 'lt-lg', 'lt-md', 'lt-sm']);
                    break;
            }
            // Simulate activation of overlapping gt-<xxxx> mediaQuery ranges
            switch (alias) {
                case 'xl':
                    this._activateByAlias(['gt-lg', 'gt-md', 'gt-sm', 'gt-xs']);
                    break;
                case 'lg':
                    this._activateByAlias(['gt-md', 'gt-sm', 'gt-xs']);
                    break;
                case 'md':
                    this._activateByAlias(['gt-sm', 'gt-xs']);
                    break;
                case 'sm':
                    this._activateByAlias(['gt-xs']);
                    break;
            }
        }
        // Activate last since the responsiveActivation is watching *this* mediaQuery
        return this._activateByQuery(mediaQuery);
    }
    /**
     *
     */
    _activateByAlias(aliases) {
        const activate = (alias) => {
            const bp = this._breakpoints.findByAlias(alias);
            this._activateByQuery(bp?.mediaQuery ?? alias);
        };
        aliases.forEach(activate);
    }
    /**
     *
     */
    _activateByQuery(mediaQuery) {
        if (!this.registry.has(mediaQuery) && this.autoRegisterQueries) {
            this._registerMediaQuery(mediaQuery);
        }
        const mql = this.registry.get(mediaQuery);
        if (mql && !this.isActive(mediaQuery)) {
            this.registry.set(mediaQuery, mql.activate());
        }
        return this.hasActivated;
    }
    /** Deactivate all current MQLs and reset the buffer */
    _deactivateAll() {
        this.registry.forEach((it) => {
            it.deactivate();
        });
        return this;
    }
    /** Insure the mediaQuery is registered with MatchMedia */
    _registerMediaQuery(mediaQuery) {
        if (!this.registry.has(mediaQuery) && this.autoRegisterQueries) {
            this.registerQuery(mediaQuery);
        }
    }
    /**
     * Call window.matchMedia() to build a MediaQueryList; which
     * supports 0..n listeners for activation/deactivation
     */
    buildMQL(query) {
        return new MockMediaQueryList(query);
    }
    get hasActivated() {
        return this.activations.length > 0;
    }
}
MockMatchMedia.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MockMatchMedia, deps: [{ token: i0.NgZone }, { token: PLATFORM_ID }, { token: DOCUMENT }, { token: i1.BreakPointRegistry }], target: i0.ɵɵFactoryTarget.Injectable });
MockMatchMedia.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MockMatchMedia });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MockMatchMedia, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.NgZone }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.BreakPointRegistry }]; } });
/**
 * Special internal class to simulate a MediaQueryList and
 * - supports manual activation to simulate mediaQuery matching
 * - manages listeners
 */
export class MockMediaQueryList extends EventTarget {
    constructor(_mediaQuery) {
        super();
        this._mediaQuery = _mediaQuery;
        this._isActive = false;
        this._listeners = [];
        this.onchange = null;
    }
    get matches() {
        return this._isActive;
    }
    get media() {
        return this._mediaQuery;
    }
    /**
     * Destroy the current list by deactivating the
     * listeners and clearing the internal list
     */
    destroy() {
        this.deactivate();
        this._listeners = [];
    }
    /** Notify all listeners that 'matches === TRUE' */
    activate() {
        if (!this._isActive) {
            this._isActive = true;
            this._listeners.forEach((callback) => {
                const cb = callback;
                cb.call(this, { matches: this.matches, media: this.media });
            });
        }
        return this;
    }
    /** Notify all listeners that 'matches === false' */
    deactivate() {
        if (this._isActive) {
            this._isActive = false;
            this._listeners.forEach((callback) => {
                const cb = callback;
                cb.call(this, { matches: this.matches, media: this.media });
            });
        }
        return this;
    }
    /** Add a listener to our internal list to activate later */
    addListener(listener) {
        if (this._listeners.indexOf(listener) === -1) {
            this._listeners.push(listener);
        }
        if (this._isActive) {
            const cb = listener;
            cb.call(this, { matches: this.matches, media: this.media });
        }
    }
    /** Don't need to remove listeners in the testing environment */
    removeListener(_) {
    }
    dispatchEvent(_) {
        return false;
    }
}
/**
 * Pre-configured provider for MockMatchMedia
 */
export const MockMatchMediaProvider = {
    provide: MatchMedia,
    useClass: MockMatchMedia
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1tYXRjaC1tZWRpYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvY29yZS9tYXRjaC1tZWRpYS9tb2NrL21vY2stbWF0Y2gtbWVkaWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQVUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUV6QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQUcxQzs7OztHQUlHO0FBRUgsTUFBTSxPQUFPLGNBQWUsU0FBUSxVQUFVO0lBTTVDLFlBQVksS0FBYSxFQUNRLFdBQW1CLEVBQ3RCLFNBQWMsRUFDeEIsWUFBZ0M7UUFDbEQsS0FBSyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFEbkIsaUJBQVksR0FBWixZQUFZLENBQW9CO1FBTnBELHdCQUFtQixHQUFHLElBQUksQ0FBQyxDQUFHLDRDQUE0QztRQUMxRSxnQkFBVyxHQUFHLEtBQUssQ0FBQyxDQUFVLDZDQUE2QztJQU8zRSxDQUFDO0lBRUQsOERBQThEO0lBQzlELFFBQVE7UUFDTixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQW1CLEVBQUUsRUFBRTtZQUMzQyxHQUEwQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLFFBQVEsQ0FBQyxVQUFrQixFQUFFLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVztRQUN6RCxV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QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgTmdab25lLCBQTEFURk9STV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5UfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQge01hdGNoTWVkaWF9IGZyb20gJy4uL21hdGNoLW1lZGlhJztcbmltcG9ydCB7QnJlYWtQb2ludFJlZ2lzdHJ5fSBmcm9tICcuLi8uLi9icmVha3BvaW50cy9icmVhay1wb2ludC1yZWdpc3RyeSc7XG5cbi8qKlxuICogTW9ja01hdGNoTWVkaWEgbW9ja3MgY2FsbHMgdG8gdGhlIFdpbmRvdyBBUEkgbWF0Y2hNZWRpYSB3aXRoIGEgYnVpbGQgb2YgYSBzaW11bGF0ZWRcbiAqIE1vY2tNZWRpYVF1ZXJ5TGlzdGVuZXIuIE1ldGhvZHMgYXJlIGF2YWlsYWJsZSB0byBzaW11bGF0ZSBhbiBhY3RpdmF0aW9uIG9mIGEgbWVkaWFRdWVyeVxuICogcmFuZ2UgYW5kIHRvIGNsZWFyQWxsIG1lZGlhUXVlcnkgbGlzdGVuZXJzLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTW9ja01hdGNoTWVkaWEgZXh0ZW5kcyBNYXRjaE1lZGlhIHtcblxuXG4gIGF1dG9SZWdpc3RlclF1ZXJpZXMgPSB0cnVlOyAgIC8vIFVzZWQgZm9yIHRlc3RpbmcgQnJlYWtQb2ludCByZWdpc3RyYXRpb25zXG4gIHVzZU92ZXJsYXBzID0gZmFsc2U7ICAgICAgICAgIC8vIEFsbG93IGZhbGxiYWNrIHRvIG92ZXJsYXBwaW5nIG1lZGlhUXVlcmllc1xuXG4gIGNvbnN0cnVjdG9yKF96b25lOiBOZ1pvbmUsXG4gICAgICAgICAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIF9wbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgICAgICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIF9kb2N1bWVudDogYW55LFxuICAgICAgICAgICAgICBwcml2YXRlIF9icmVha3BvaW50czogQnJlYWtQb2ludFJlZ2lzdHJ5KSB7XG4gICAgc3VwZXIoX3pvbmUsIF9wbGF0Zm9ybUlkLCBfZG9jdW1lbnQpO1xuICB9XG5cbiAgLyoqIEVhc3kgbWV0aG9kIHRvIGNsZWFyIGFsbCBsaXN0ZW5lcnMgZm9yIGFsbCBtZWRpYVF1ZXJpZXMgKi9cbiAgY2xlYXJBbGwoKSB7XG4gICAgdGhpcy5yZWdpc3RyeS5mb3JFYWNoKChtcWw6IE1lZGlhUXVlcnlMaXN0KSA9PiB7XG4gICAgICAobXFsIGFzIE1vY2tNZWRpYVF1ZXJ5TGlzdCkuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIHRoaXMucmVnaXN0cnkuY2xlYXIoKTtcbiAgICB0aGlzLnVzZU92ZXJsYXBzID0gZmFsc2U7XG4gIH1cblxuICAvKiogRmVhdHVyZSB0byBzdXBwb3J0IG1hbnVhbCwgc2ltdWxhdGVkIGFjdGl2YXRpb24gb2YgYSBtZWRpYVF1ZXJ5LiAqL1xuICBhY3RpdmF0ZShtZWRpYVF1ZXJ5OiBzdHJpbmcsIHVzZU92ZXJsYXBzID0gdGhpcy51c2VPdmVybGFwcyk6IGJvb2xlYW4ge1xuICAgIG1lZGlhUXVlcnkgPSB0aGlzLl92YWxpZGF0ZVF1ZXJ5KG1lZGlhUXVlcnkpO1xuXG4gICAgaWYgKHVzZU92ZXJsYXBzIHx8ICF0aGlzLmlzQWN0aXZlKG1lZGlhUXVlcnkpKSB7XG4gICAgICB0aGlzLl9kZWFjdGl2YXRlQWxsKCk7XG5cbiAgICAgIHRoaXMuX3JlZ2lzdGVyTWVkaWFRdWVyeShtZWRpYVF1ZXJ5KTtcbiAgICAgIHRoaXMuX2FjdGl2YXRlV2l0aE92ZXJsYXBzKG1lZGlhUXVlcnksIHVzZU92ZXJsYXBzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5oYXNBY3RpdmF0ZWQ7XG4gIH1cblxuICAvKiogQ29udmVydHMgYW4gb3B0aW9uYWwgbWVkaWFRdWVyeSBhbGlhcyB0byBhIHNwZWNpZmljLCB2YWxpZCBtZWRpYVF1ZXJ5ICovXG4gIF92YWxpZGF0ZVF1ZXJ5KHF1ZXJ5T3JBbGlhczogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBicCA9IHRoaXMuX2JyZWFrcG9pbnRzLmZpbmRCeUFsaWFzKHF1ZXJ5T3JBbGlhcyk7XG4gICAgcmV0dXJuIGJwPy5tZWRpYVF1ZXJ5ID8/IHF1ZXJ5T3JBbGlhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWxseSBvbk1lZGlhQ2hhbmdlIGFueSBvdmVybGFwcGluZyBtZWRpYVF1ZXJpZXMgdG8gc2ltdWxhdGVcbiAgICogc2ltaWxhciBmdW5jdGlvbmFsaXR5IGluIHRoZSB3aW5kb3cubWF0Y2hNZWRpYSgpXG4gICAqL1xuICBwcml2YXRlIF9hY3RpdmF0ZVdpdGhPdmVybGFwcyhtZWRpYVF1ZXJ5OiBzdHJpbmcsIHVzZU92ZXJsYXBzOiBib29sZWFuKTogYm9vbGVhbiB7XG4gICAgaWYgKHVzZU92ZXJsYXBzKSB7XG4gICAgICBjb25zdCBicCA9IHRoaXMuX2JyZWFrcG9pbnRzLmZpbmRCeVF1ZXJ5KG1lZGlhUXVlcnkpO1xuICAgICAgY29uc3QgYWxpYXMgPSBicD8uYWxpYXMgPz8gJ3Vua25vd24nO1xuXG4gICAgICAvLyBTaW11bGF0ZSBhY3RpdmF0aW9uIG9mIG92ZXJsYXBwaW5nIGx0LTxYWFg+IHJhbmdlc1xuICAgICAgc3dpdGNoIChhbGlhcykge1xuICAgICAgICBjYXNlICdsZyc6XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGVCeUFsaWFzKFsnbHQteGwnXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ21kJzpcbiAgICAgICAgICB0aGlzLl9hY3RpdmF0ZUJ5QWxpYXMoWydsdC14bCcsICdsdC1sZyddKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc20nOlxuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlQnlBbGlhcyhbJ2x0LXhsJywgJ2x0LWxnJywgJ2x0LW1kJ10pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd4cyc6XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGVCeUFsaWFzKFsnbHQteGwnLCAnbHQtbGcnLCAnbHQtbWQnLCAnbHQtc20nXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIC8vIFNpbXVsYXRlIGFjdGl2YXRpb24gb2Ygb3ZlcmxhcHBpbmcgZ3QtPHh4eHg+IG1lZGlhUXVlcnkgcmFuZ2VzXG4gICAgICBzd2l0Y2ggKGFsaWFzKSB7XG4gICAgICAgIGNhc2UgJ3hsJzpcbiAgICAgICAgICB0aGlzLl9hY3RpdmF0ZUJ5QWxpYXMoWydndC1sZycsICdndC1tZCcsICdndC1zbScsICdndC14cyddKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbGcnOlxuICAgICAgICAgIHRoaXMuX2FjdGl2YXRlQnlBbGlhcyhbJ2d0LW1kJywgJ2d0LXNtJywgJ2d0LXhzJ10pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdtZCc6XG4gICAgICAgICAgdGhpcy5fYWN0aXZhdGVCeUFsaWFzKFsnZ3Qtc20nLCAnZ3QteHMnXSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3NtJzpcbiAgICAgICAgICB0aGlzLl9hY3RpdmF0ZUJ5QWxpYXMoWydndC14cyddKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBY3RpdmF0ZSBsYXN0IHNpbmNlIHRoZSByZXNwb25zaXZlQWN0aXZhdGlvbiBpcyB3YXRjaGluZyAqdGhpcyogbWVkaWFRdWVyeVxuICAgIHJldHVybiB0aGlzLl9hY3RpdmF0ZUJ5UXVlcnkobWVkaWFRdWVyeSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2FjdGl2YXRlQnlBbGlhcyhhbGlhc2VzOiBzdHJpbmdbXSkge1xuICAgIGNvbnN0IGFjdGl2YXRlID0gKGFsaWFzOiBzdHJpbmcpID0+IHtcbiAgICAgIGNvbnN0IGJwID0gdGhpcy5fYnJlYWtwb2ludHMuZmluZEJ5QWxpYXMoYWxpYXMpO1xuICAgICAgdGhpcy5fYWN0aXZhdGVCeVF1ZXJ5KGJwPy5tZWRpYVF1ZXJ5ID8/IGFsaWFzKTtcbiAgICB9O1xuICAgIGFsaWFzZXMuZm9yRWFjaChhY3RpdmF0ZSk7XG4gIH1cblxuICAvKipcbiAgICpcbiAgICovXG4gIHByaXZhdGUgX2FjdGl2YXRlQnlRdWVyeShtZWRpYVF1ZXJ5OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMucmVnaXN0cnkuaGFzKG1lZGlhUXVlcnkpICYmIHRoaXMuYXV0b1JlZ2lzdGVyUXVlcmllcykge1xuICAgICAgdGhpcy5fcmVnaXN0ZXJNZWRpYVF1ZXJ5KG1lZGlhUXVlcnkpO1xuICAgIH1cbiAgICBjb25zdCBtcWw6IE1vY2tNZWRpYVF1ZXJ5TGlzdCA9IHRoaXMucmVnaXN0cnkuZ2V0KG1lZGlhUXVlcnkpIGFzIE1vY2tNZWRpYVF1ZXJ5TGlzdDtcblxuICAgIGlmIChtcWwgJiYgIXRoaXMuaXNBY3RpdmUobWVkaWFRdWVyeSkpIHtcbiAgICAgIHRoaXMucmVnaXN0cnkuc2V0KG1lZGlhUXVlcnksIG1xbC5hY3RpdmF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuaGFzQWN0aXZhdGVkO1xuICB9XG5cbiAgLyoqIERlYWN0aXZhdGUgYWxsIGN1cnJlbnQgTVFMcyBhbmQgcmVzZXQgdGhlIGJ1ZmZlciAqL1xuICBwcml2YXRlIF9kZWFjdGl2YXRlQWxsKCkge1xuICAgIHRoaXMucmVnaXN0cnkuZm9yRWFjaCgoaXQ6IE1lZGlhUXVlcnlMaXN0KSA9PiB7XG4gICAgICAoaXQgYXMgTW9ja01lZGlhUXVlcnlMaXN0KS5kZWFjdGl2YXRlKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogSW5zdXJlIHRoZSBtZWRpYVF1ZXJ5IGlzIHJlZ2lzdGVyZWQgd2l0aCBNYXRjaE1lZGlhICovXG4gIHByaXZhdGUgX3JlZ2lzdGVyTWVkaWFRdWVyeShtZWRpYVF1ZXJ5OiBzdHJpbmcpIHtcbiAgICBpZiAoIXRoaXMucmVnaXN0cnkuaGFzKG1lZGlhUXVlcnkpICYmIHRoaXMuYXV0b1JlZ2lzdGVyUXVlcmllcykge1xuICAgICAgdGhpcy5yZWdpc3RlclF1ZXJ5KG1lZGlhUXVlcnkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxsIHdpbmRvdy5tYXRjaE1lZGlhKCkgdG8gYnVpbGQgYSBNZWRpYVF1ZXJ5TGlzdDsgd2hpY2hcbiAgICogc3VwcG9ydHMgMC4ubiBsaXN0ZW5lcnMgZm9yIGFjdGl2YXRpb24vZGVhY3RpdmF0aW9uXG4gICAqL1xuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgYnVpbGRNUUwocXVlcnk6IHN0cmluZyk6IE1lZGlhUXVlcnlMaXN0IHtcbiAgICByZXR1cm4gbmV3IE1vY2tNZWRpYVF1ZXJ5TGlzdChxdWVyeSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0IGhhc0FjdGl2YXRlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RpdmF0aW9ucy5sZW5ndGggPiAwO1xuICB9XG5cbn1cblxuLyoqXG4gKiBTcGVjaWFsIGludGVybmFsIGNsYXNzIHRvIHNpbXVsYXRlIGEgTWVkaWFRdWVyeUxpc3QgYW5kXG4gKiAtIHN1cHBvcnRzIG1hbnVhbCBhY3RpdmF0aW9uIHRvIHNpbXVsYXRlIG1lZGlhUXVlcnkgbWF0Y2hpbmdcbiAqIC0gbWFuYWdlcyBsaXN0ZW5lcnNcbiAqL1xuZXhwb3J0IGNsYXNzIE1vY2tNZWRpYVF1ZXJ5TGlzdCBleHRlbmRzIEV2ZW50VGFyZ2V0IGltcGxlbWVudHMgTWVkaWFRdWVyeUxpc3Qge1xuICBwcml2YXRlIF9pc0FjdGl2ZSA9IGZhbHNlO1xuICBwcml2YXRlIF9saXN0ZW5lcnM6IE1lZGlhUXVlcnlMaXN0TGlzdGVuZXJbXSA9IFtdO1xuXG4gIGdldCBtYXRjaGVzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0FjdGl2ZTtcbiAgfVxuXG4gIGdldCBtZWRpYSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9tZWRpYVF1ZXJ5O1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWVkaWFRdWVyeTogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IGxpc3QgYnkgZGVhY3RpdmF0aW5nIHRoZVxuICAgKiBsaXN0ZW5lcnMgYW5kIGNsZWFyaW5nIHRoZSBpbnRlcm5hbCBsaXN0XG4gICAqL1xuICBkZXN0cm95KCkge1xuICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgIHRoaXMuX2xpc3RlbmVycyA9IFtdO1xuICB9XG5cbiAgLyoqIE5vdGlmeSBhbGwgbGlzdGVuZXJzIHRoYXQgJ21hdGNoZXMgPT09IFRSVUUnICovXG4gIGFjdGl2YXRlKCk6IE1vY2tNZWRpYVF1ZXJ5TGlzdCB7XG4gICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xuICAgICAgdGhpcy5fbGlzdGVuZXJzLmZvckVhY2goKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGNiOiAoKHRoaXM6IE1lZGlhUXVlcnlMaXN0LCBldjogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4gYW55KSA9IGNhbGxiYWNrITtcbiAgICAgICAgY2IuY2FsbCh0aGlzLCB7bWF0Y2hlczogdGhpcy5tYXRjaGVzLCBtZWRpYTogdGhpcy5tZWRpYX0gYXMgTWVkaWFRdWVyeUxpc3RFdmVudCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvKiogTm90aWZ5IGFsbCBsaXN0ZW5lcnMgdGhhdCAnbWF0Y2hlcyA9PT0gZmFsc2UnICovXG4gIGRlYWN0aXZhdGUoKTogTW9ja01lZGlhUXVlcnlMaXN0IHtcbiAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcbiAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IHtcbiAgICAgICAgY29uc3QgY2I6ICgodGhpczogTWVkaWFRdWVyeUxpc3QsIGV2OiBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PiBhbnkpID0gY2FsbGJhY2shO1xuICAgICAgICBjYi5jYWxsKHRoaXMsIHttYXRjaGVzOiB0aGlzLm1hdGNoZXMsIG1lZGlhOiB0aGlzLm1lZGlhfSBhcyBNZWRpYVF1ZXJ5TGlzdEV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qKiBBZGQgYSBsaXN0ZW5lciB0byBvdXIgaW50ZXJuYWwgbGlzdCB0byBhY3RpdmF0ZSBsYXRlciAqL1xuICBhZGRMaXN0ZW5lcihsaXN0ZW5lcjogTWVkaWFRdWVyeUxpc3RMaXN0ZW5lcikge1xuICAgIGlmICh0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgPT09IC0xKSB7XG4gICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgfVxuICAgIGlmICh0aGlzLl9pc0FjdGl2ZSkge1xuICAgICAgY29uc3QgY2I6ICgodGhpczogTWVkaWFRdWVyeUxpc3QsIGV2OiBNZWRpYVF1ZXJ5TGlzdEV2ZW50KSA9PiBhbnkpID0gbGlzdGVuZXIhO1xuICAgICAgY2IuY2FsbCh0aGlzLCB7bWF0Y2hlczogdGhpcy5tYXRjaGVzLCBtZWRpYTogdGhpcy5tZWRpYX0gYXMgTWVkaWFRdWVyeUxpc3RFdmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqIERvbid0IG5lZWQgdG8gcmVtb3ZlIGxpc3RlbmVycyBpbiB0aGUgdGVzdGluZyBlbnZpcm9ubWVudCAqL1xuICByZW1vdmVMaXN0ZW5lcihfOiBNZWRpYVF1ZXJ5TGlzdExpc3RlbmVyIHwgbnVsbCkge1xuICB9XG5cbiAgb3ZlcnJpZGUgZGlzcGF0Y2hFdmVudChfOiBFdmVudCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uY2hhbmdlOiBNZWRpYVF1ZXJ5TGlzdExpc3RlbmVyID0gbnVsbDtcbn1cblxuLyoqXG4gKiBQcmUtY29uZmlndXJlZCBwcm92aWRlciBmb3IgTW9ja01hdGNoTWVkaWFcbiAqL1xuZXhwb3J0IGNvbnN0IE1vY2tNYXRjaE1lZGlhUHJvdmlkZXIgPSB7ICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOnZhcmlhYmxlLW5hbWVcbiAgcHJvdmlkZTogTWF0Y2hNZWRpYSxcbiAgdXNlQ2xhc3M6IE1vY2tNYXRjaE1lZGlhXG59O1xuXG50eXBlIE1lZGlhUXVlcnlMaXN0TGlzdGVuZXIgPSAoKHRoaXM6IE1lZGlhUXVlcnlMaXN0LCBldjogTWVkaWFRdWVyeUxpc3RFdmVudCkgPT4gYW55KSB8IG51bGw7XG4iXX0=