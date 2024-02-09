/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { mergeAlias } from '../add-alias';
import { MediaChange } from '../media-change';
import { sortDescendingPriority } from '../utils/sort';
import { LAYOUT_CONFIG } from '../tokens/library-config';
import * as i0 from "@angular/core";
import * as i1 from "../breakpoints/break-point-registry";
import * as i2 from "../match-media/match-media";
/**
 * Class
 */
export class MediaTrigger {
    constructor(breakpoints, matchMedia, layoutConfig, _platformId, _document) {
        this.breakpoints = breakpoints;
        this.matchMedia = matchMedia;
        this.layoutConfig = layoutConfig;
        this._platformId = _platformId;
        this._document = _document;
        this.hasCachedRegistryMatches = false;
        this.originalActivations = [];
        this.originalRegistry = new Map();
    }
    /**
     * Manually activate range of breakpoints
     * @param list array of mediaQuery or alias strings
     */
    activate(list) {
        list = list.map(it => it.trim()); // trim queries
        this.saveActivations();
        this.deactivateAll();
        this.setActivations(list);
        this.prepareAutoRestore();
    }
    /**
     * Restore original, 'real' breakpoints and emit events
     * to trigger stream notification
     */
    restore() {
        if (this.hasCachedRegistryMatches) {
            const extractQuery = (change) => change.mediaQuery;
            const list = this.originalActivations.map(extractQuery);
            try {
                this.deactivateAll();
                this.restoreRegistryMatches();
                this.setActivations(list);
            }
            finally {
                this.originalActivations = [];
                if (this.resizeSubscription) {
                    this.resizeSubscription.unsubscribe();
                }
            }
        }
    }
    // ************************************************
    // Internal Methods
    // ************************************************
    /**
     * Whenever window resizes, immediately auto-restore original
     * activations (if we are simulating activations)
     */
    prepareAutoRestore() {
        const isBrowser = isPlatformBrowser(this._platformId) && this._document;
        const enableAutoRestore = isBrowser && this.layoutConfig.mediaTriggerAutoRestore;
        if (enableAutoRestore) {
            const resize$ = fromEvent(window, 'resize').pipe(take(1));
            this.resizeSubscription = resize$.subscribe(this.restore.bind(this));
        }
    }
    /**
     * Notify all matchMedia subscribers of de-activations
     *
     * Note: we must force 'matches' updates for
     *       future matchMedia::activation lookups
     */
    deactivateAll() {
        const list = this.currentActivations;
        this.forceRegistryMatches(list, false);
        this.simulateMediaChanges(list, false);
    }
    /**
     * Cache current activations as sorted, prioritized list of MediaChanges
     */
    saveActivations() {
        if (!this.hasCachedRegistryMatches) {
            const toMediaChange = (query) => new MediaChange(true, query);
            const mergeMQAlias = (change) => {
                const bp = this.breakpoints.findByQuery(change.mediaQuery);
                return mergeAlias(change, bp);
            };
            this.originalActivations = this.currentActivations
                .map(toMediaChange)
                .map(mergeMQAlias)
                .sort(sortDescendingPriority);
            this.cacheRegistryMatches();
        }
    }
    /**
     * Force set manual activations for specified mediaQuery list
     */
    setActivations(list) {
        if (!!this.originalRegistry) {
            this.forceRegistryMatches(list, true);
        }
        this.simulateMediaChanges(list);
    }
    /**
     * For specified mediaQuery list manually simulate activations or deactivations
     */
    simulateMediaChanges(queries, matches = true) {
        const toMediaQuery = (query) => {
            const locator = this.breakpoints;
            const bp = locator.findByAlias(query) || locator.findByQuery(query);
            return bp ? bp.mediaQuery : query;
        };
        const emitChangeEvent = (query) => this.emitChangeEvent(matches, query);
        queries.map(toMediaQuery).forEach(emitChangeEvent);
    }
    /**
     * Replace current registry with simulated registry...
     * Note: this is required since MediaQueryList::matches is 'readOnly'
     */
    forceRegistryMatches(queries, matches) {
        const registry = new Map();
        queries.forEach(query => {
            registry.set(query, { matches });
        });
        this.matchMedia.registry = registry;
    }
    /**
     * Save current MatchMedia::registry items.
     */
    cacheRegistryMatches() {
        const target = this.originalRegistry;
        target.clear();
        this.matchMedia.registry.forEach((value, key) => {
            target.set(key, value);
        });
        this.hasCachedRegistryMatches = true;
    }
    /**
     * Restore original, 'true' registry
     */
    restoreRegistryMatches() {
        const target = this.matchMedia.registry;
        target.clear();
        this.originalRegistry.forEach((value, key) => {
            target.set(key, value);
        });
        this.originalRegistry.clear();
        this.hasCachedRegistryMatches = false;
    }
    /**
     * Manually emit a MediaChange event via the MatchMedia to MediaMarshaller and MediaObserver
     */
    emitChangeEvent(matches, query) {
        this.matchMedia.source.next(new MediaChange(matches, query));
    }
    get currentActivations() {
        return this.matchMedia.activations;
    }
}
MediaTrigger.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MediaTrigger, deps: [{ token: i1.BreakPointRegistry }, { token: i2.MatchMedia }, { token: LAYOUT_CONFIG }, { token: PLATFORM_ID }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable });
MediaTrigger.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MediaTrigger, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.2", ngImport: i0, type: MediaTrigger, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: function () { return [{ type: i1.BreakPointRegistry }, { type: i2.MatchMedia }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [LAYOUT_CONFIG]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtdHJpZ2dlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2xpYnMvZmxleC1sYXlvdXQvY29yZS9tZWRpYS10cmlnZ2VyL21lZGlhLXRyaWdnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBQ0gsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUU1RCxPQUFPLEVBQUMsU0FBUyxFQUFlLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVwQyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ3hDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUc1QyxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDckQsT0FBTyxFQUFDLGFBQWEsRUFBc0IsTUFBTSwwQkFBMEIsQ0FBQzs7OztBQUU1RTs7R0FFRztBQUVILE1BQU0sT0FBTyxZQUFZO0lBRXZCLFlBQ2MsV0FBK0IsRUFDL0IsVUFBc0IsRUFDQyxZQUFpQyxFQUNuQyxXQUFtQixFQUN0QixTQUFjO1FBSmhDLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ0MsaUJBQVksR0FBWixZQUFZLENBQXFCO1FBQ25DLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ3RCLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFxS3RDLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyx3QkFBbUIsR0FBa0IsRUFBRSxDQUFDO1FBQ3hDLHFCQUFnQixHQUFnQyxJQUFJLEdBQUcsRUFBMEIsQ0FBQztJQXRLMUYsQ0FBQztJ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QUFPLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3JDLENBQUM7O3lHQTFLVSxZQUFZLDhFQUtYLGFBQWEsYUFDYixXQUFXLGFBQ1gsUUFBUTs2R0FQVCxZQUFZLGNBREEsTUFBTTsyRkFDbEIsWUFBWTtrQkFEeEIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzBCQU16QixNQUFNOzJCQUFDLGFBQWE7OzBCQUNwQixNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlLCBQTEFURk9STV9JRH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RPQ1VNRU5ULCBpc1BsYXRmb3JtQnJvd3Nlcn0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHtmcm9tRXZlbnQsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2V9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHttZXJnZUFsaWFzfSBmcm9tICcuLi9hZGQtYWxpYXMnO1xuaW1wb3J0IHtNZWRpYUNoYW5nZX0gZnJvbSAnLi4vbWVkaWEtY2hhbmdlJztcbmltcG9ydCB7TWF0Y2hNZWRpYX0gZnJvbSAnLi4vbWF0Y2gtbWVkaWEvbWF0Y2gtbWVkaWEnO1xuaW1wb3J0IHtCcmVha1BvaW50UmVnaXN0cnksIE9wdGlvbmFsQnJlYWtQb2ludH0gZnJvbSAnLi4vYnJlYWtwb2ludHMvYnJlYWstcG9pbnQtcmVnaXN0cnknO1xuaW1wb3J0IHtzb3J0RGVzY2VuZGluZ1ByaW9yaXR5fSBmcm9tICcuLi91dGlscy9zb3J0JztcbmltcG9ydCB7TEFZT1VUX0NPTkZJRywgTGF5b3V0Q29uZmlnT3B0aW9uc30gZnJvbSAnLi4vdG9rZW5zL2xpYnJhcnktY29uZmlnJztcblxuLyoqXG4gKiBDbGFzc1xuICovXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBNZWRpYVRyaWdnZXIge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJvdGVjdGVkIGJyZWFrcG9pbnRzOiBCcmVha1BvaW50UmVnaXN0cnksXG4gICAgICBwcm90ZWN0ZWQgbWF0Y2hNZWRpYTogTWF0Y2hNZWRpYSxcbiAgICAgIEBJbmplY3QoTEFZT1VUX0NPTkZJRykgcHJvdGVjdGVkIGxheW91dENvbmZpZzogTGF5b3V0Q29uZmlnT3B0aW9ucyxcbiAgICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBfcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgICAgQEluamVjdChET0NVTUVOVCkgcHJvdGVjdGVkIF9kb2N1bWVudDogYW55KSB7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgYWN0aXZhdGUgcmFuZ2Ugb2YgYnJlYWtwb2ludHNcbiAgICogQHBhcmFtIGxpc3QgYXJyYXkgb2YgbWVkaWFRdWVyeSBvciBhbGlhcyBzdHJpbmdzXG4gICAqL1xuICBhY3RpdmF0ZShsaXN0OiBzdHJpbmdbXSkge1xuICAgIGxpc3QgPSBsaXN0Lm1hcChpdCA9PiBpdC50cmltKCkpOyAvLyB0cmltIHF1ZXJpZXNcblxuICAgIHRoaXMuc2F2ZUFjdGl2YXRpb25zKCk7XG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG4gICAgdGhpcy5zZXRBY3RpdmF0aW9ucyhsaXN0KTtcblxuICAgIHRoaXMucHJlcGFyZUF1dG9SZXN0b3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzdG9yZSBvcmlnaW5hbCwgJ3JlYWwnIGJyZWFrcG9pbnRzIGFuZCBlbWl0IGV2ZW50c1xuICAgKiB0byB0cmlnZ2VyIHN0cmVhbSBub3RpZmljYXRpb25cbiAgICovXG4gIHJlc3RvcmUoKSB7XG4gICAgaWYgKHRoaXMuaGFzQ2FjaGVkUmVnaXN0cnlNYXRjaGVzKSB7XG4gICAgICBjb25zdCBleHRyYWN0UXVlcnkgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT4gY2hhbmdlLm1lZGlhUXVlcnk7XG4gICAgICBjb25zdCBsaXN0ID0gdGhpcy5vcmlnaW5hbEFjdGl2YXRpb25zLm1hcChleHRyYWN0UXVlcnkpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlQWxsKCk7XG4gICAgICAgIHRoaXMucmVzdG9yZVJlZ2lzdHJ5TWF0Y2hlcygpO1xuICAgICAgICB0aGlzLnNldEFjdGl2YXRpb25zKGxpc3QpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5vcmlnaW5hbEFjdGl2YXRpb25zID0gW107XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgIHRoaXMucmVzaXplU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAgLy8gSW50ZXJuYWwgTWV0aG9kc1xuICAvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcblxuICAvKipcbiAgICogV2hlbmV2ZXIgd2luZG93IHJlc2l6ZXMsIGltbWVkaWF0ZWx5IGF1dG8tcmVzdG9yZSBvcmlnaW5hbFxuICAgKiBhY3RpdmF0aW9ucyAoaWYgd2UgYXJlIHNpbXVsYXRpbmcgYWN0aXZhdGlvbnMpXG4gICAqL1xuICBwcml2YXRlIHByZXBhcmVBdXRvUmVzdG9yZSgpIHtcbiAgICBjb25zdCBpc0Jyb3dzZXIgPSBpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLl9wbGF0Zm9ybUlkKSAmJiB0aGlzLl9kb2N1bWVudDtcbiAgICBjb25zdCBlbmFibGVBdXRvUmVzdG9yZSA9IGlzQnJvd3NlciAmJiB0aGlzLmxheW91dENvbmZpZy5tZWRpYVRyaWdnZXJBdXRvUmVzdG9yZTtcblxuICAgIGlmIChlbmFibGVBdXRvUmVzdG9yZSkge1xuICAgICAgY29uc3QgcmVzaXplJCA9IGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKS5waXBlKHRha2UoMSkpO1xuICAgICAgdGhpcy5yZXNpemVTdWJzY3JpcHRpb24gPSByZXNpemUkLnN1YnNjcmliZSh0aGlzLnJlc3RvcmUuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE5vdGlmeSBhbGwgbWF0Y2hNZWRpYSBzdWJzY3JpYmVycyBvZiBkZS1hY3RpdmF0aW9uc1xuICAgKlxuICAgKiBOb3RlOiB3ZSBtdXN0IGZvcmNlICdtYXRjaGVzJyB1cGRhdGVzIGZvclxuICAgKiAgICAgICBmdXR1cmUgbWF0Y2hNZWRpYTo6YWN0aXZhdGlvbiBsb29rdXBzXG4gICAqL1xuICBwcml2YXRlIGRlYWN0aXZhdGVBbGwoKSB7XG4gICAgY29uc3QgbGlzdCA9IHRoaXMuY3VycmVudEFjdGl2YXRpb25zO1xuXG4gICAgdGhpcy5mb3JjZVJlZ2lzdHJ5TWF0Y2hlcyhsaXN0LCBmYWxzZSk7XG4gICAgdGhpcy5zaW11bGF0ZU1lZGlhQ2hhbmdlcyhsaXN0LCBmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FjaGUgY3VycmVudCBhY3RpdmF0aW9ucyBhcyBzb3J0ZWQsIHByaW9yaXRpemVkIGxpc3Qgb2YgTWVkaWFDaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIHNhdmVBY3RpdmF0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMuaGFzQ2FjaGVkUmVnaXN0cnlNYXRjaGVzKSB7XG4gICAgICBjb25zdCB0b01lZGlhQ2hhbmdlID0gKHF1ZXJ5OiBzdHJpbmcpID0+IG5ldyBNZWRpYUNoYW5nZSh0cnVlLCBxdWVyeSk7XG4gICAgICBjb25zdCBtZXJnZU1RQWxpYXMgPSAoY2hhbmdlOiBNZWRpYUNoYW5nZSkgPT4ge1xuICAgICAgICBjb25zdCBicDogT3B0aW9uYWxCcmVha1BvaW50ID0gdGhpcy5icmVha3BvaW50cy5maW5kQnlRdWVyeShjaGFuZ2UubWVkaWFRdWVyeSk7XG4gICAgICAgIHJldHVybiBtZXJnZUFsaWFzKGNoYW5nZSwgYnApO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5vcmlnaW5hbEFjdGl2YXRpb25zID0gdGhpcy5jdXJyZW50QWN0aXZhdGlvbnNcbiAgICAgICAgICAubWFwKHRvTWVkaWFDaGFuZ2UpXG4gICAgICAgICAgLm1hcChtZXJnZU1RQWxpYXMpXG4gICAgICAgICAgLnNvcnQoc29ydERlc2NlbmRpbmdQcmlvcml0eSk7XG5cbiAgICAgIHRoaXMuY2FjaGVSZWdpc3RyeU1hdGNoZXMoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yY2Ugc2V0IG1hbnVhbCBhY3RpdmF0aW9ucyBmb3Igc3BlY2lmaWVkIG1lZGlhUXVlcnkgbGlzdFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRBY3RpdmF0aW9ucyhsaXN0OiBzdHJpbmdbXSkge1xuICAgIGlmICghIXRoaXMub3JpZ2luYWxSZWdpc3RyeSkge1xuICAgICAgdGhpcy5mb3JjZVJlZ2lzdHJ5TWF0Y2hlcyhsaXN0LCB0cnVlKTtcbiAgICB9XG4gICAgdGhpcy5zaW11bGF0ZU1lZGlhQ2hhbmdlcyhsaXN0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3Igc3BlY2lmaWVkIG1lZGlhUXVlcnkgbGlzdCBtYW51YWxseSBzaW11bGF0ZSBhY3RpdmF0aW9ucyBvciBkZWFjdGl2YXRpb25zXG4gICAqL1xuICBwcml2YXRlIHNpbXVsYXRlTWVkaWFDaGFuZ2VzKHF1ZXJpZXM6IHN0cmluZ1tdLCBtYXRjaGVzID0gdHJ1ZSkge1xuICAgIGNvbnN0IHRvTWVkaWFRdWVyeSA9IChxdWVyeTogc3RyaW5nKSA9PiB7XG4gICAgICBjb25zdCBsb2NhdG9yID0gdGhpcy5icmVha3BvaW50cztcbiAgICAgIGNvbnN0IGJwID0gbG9jYXRvci5maW5kQnlBbGlhcyhxdWVyeSkgfHwgbG9jYXRvci5maW5kQnlRdWVyeShxdWVyeSk7XG4gICAgICByZXR1cm4gYnAgPyBicC5tZWRpYVF1ZXJ5IDogcXVlcnk7XG4gICAgfTtcbiAgICBjb25zdCBlbWl0Q2hhbmdlRXZlbnQgPSAocXVlcnk6IHN0cmluZykgPT4gdGhpcy5lbWl0Q2hhbmdlRXZlbnQobWF0Y2hlcywgcXVlcnkpO1xuXG4gICAgcXVlcmllcy5tYXAodG9NZWRpYVF1ZXJ5KS5mb3JFYWNoKGVtaXRDaGFuZ2VFdmVudCk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBjdXJyZW50IHJlZ2lzdHJ5IHdpdGggc2ltdWxhdGVkIHJlZ2lzdHJ5Li4uXG4gICAqIE5vdGU6IHRoaXMgaXMgcmVxdWlyZWQgc2luY2UgTWVkaWFRdWVyeUxpc3Q6Om1hdGNoZXMgaXMgJ3JlYWRPbmx5J1xuICAgKi9cbiAgcHJpdmF0ZSBmb3JjZVJlZ2lzdHJ5TWF0Y2hlcyhxdWVyaWVzOiBzdHJpbmdbXSwgbWF0Y2hlczogYm9vbGVhbikge1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gbmV3IE1hcDxzdHJpbmcsIE1lZGlhUXVlcnlMaXN0PigpO1xuICAgIHF1ZXJpZXMuZm9yRWFjaChxdWVyeSA9PiB7XG4gICAgICByZWdpc3RyeS5zZXQocXVlcnksIHttYXRjaGVzfSBhcyBNZWRpYVF1ZXJ5TGlzdCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1hdGNoTWVkaWEucmVnaXN0cnkgPSByZWdpc3RyeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTYXZlIGN1cnJlbnQgTWF0Y2hNZWRpYTo6cmVnaXN0cnkgaXRlbXMuXG4gICAqL1xuICBwcml2YXRlIGNhY2hlUmVnaXN0cnlNYXRjaGVzKCkge1xuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMub3JpZ2luYWxSZWdpc3RyeTtcblxuICAgIHRhcmdldC5jbGVhcigpO1xuICAgIHRoaXMubWF0Y2hNZWRpYS5yZWdpc3RyeS5mb3JFYWNoKCh2YWx1ZTogTWVkaWFRdWVyeUxpc3QsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICB0YXJnZXQuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0pO1xuICAgIHRoaXMuaGFzQ2FjaGVkUmVnaXN0cnlNYXRjaGVzID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXN0b3JlIG9yaWdpbmFsLCAndHJ1ZScgcmVnaXN0cnlcbiAgICovXG4gIHByaXZhdGUgcmVzdG9yZVJlZ2lzdHJ5TWF0Y2hlcygpIHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzLm1hdGNoTWVkaWEucmVnaXN0cnk7XG5cbiAgICB0YXJnZXQuY2xlYXIoKTtcbiAgICB0aGlzLm9yaWdpbmFsUmVnaXN0cnkuZm9yRWFjaCgodmFsdWU6IE1lZGlhUXVlcnlMaXN0LCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgdGFyZ2V0LnNldChrZXksIHZhbHVlKTtcbiAgICB9KTtcblxuICAgIHRoaXMub3JpZ2luYWxSZWdpc3RyeS5jbGVhcigpO1xuICAgIHRoaXMuaGFzQ2FjaGVkUmVnaXN0cnlNYXRjaGVzID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogTWFudWFsbHkgZW1pdCBhIE1lZGlhQ2hhbmdlIGV2ZW50IHZpYSB0aGUgTWF0Y2hNZWRpYSB0byBNZWRpYU1hcnNoYWxsZXIgYW5kIE1lZGlhT2JzZXJ2ZXJcbiAgICovXG4gIHByaXZhdGUgZW1pdENoYW5nZUV2ZW50KG1hdGNoZXM6IGJvb2xlYW4sIHF1ZXJ5OiBzdHJpbmcpIHtcbiAgICB0aGlzLm1hdGNoTWVkaWEuc291cmNlLm5leHQobmV3IE1lZGlhQ2hhbmdlKG1hdGNoZXMsIHF1ZXJ5KSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBjdXJyZW50QWN0aXZhdGlvbnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLm1hdGNoTWVkaWEuYWN0aXZhdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIGhhc0NhY2hlZFJlZ2lzdHJ5TWF0Y2hlcyA9IGZhbHNlO1xuICBwcml2YXRlIG9yaWdpbmFsQWN0aXZhdGlvbnM6IE1lZGlhQ2hhbmdlW10gPSBbXTtcbiAgcHJpdmF0ZSBvcmlnaW5hbFJlZ2lzdHJ5OiBNYXA8c3RyaW5nLCBNZWRpYVF1ZXJ5TGlzdD4gPSBuZXcgTWFwPHN0cmluZywgTWVkaWFRdWVyeUxpc3Q+KCk7XG5cbiAgcHJpdmF0ZSByZXNpemVTdWJzY3JpcHRpb24hOiBTdWJzY3JpcHRpb247XG59XG5cbiJdfQ==