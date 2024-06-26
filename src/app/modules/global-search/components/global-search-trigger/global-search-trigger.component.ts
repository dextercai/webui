import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, ViewContainerRef,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { delay, take } from 'rxjs';
import { GlobalSearchComponent } from 'app/modules/global-search/components/global-search/global-search.component';
import { searchDelayConst } from 'app/modules/global-search/constants/delay.const';
import { UiSearchProvider } from 'app/modules/global-search/services/ui-search.service';

@UntilDestroy()
@Component({
  selector: 'ix-global-search-trigger',
  templateUrl: './global-search-trigger.component.html',
  styleUrls: ['./global-search-trigger.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlobalTriggerSearchComponent implements AfterViewInit {
  overlayRef: OverlayRef;

  constructor(
    private cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private searchProvider: UiSearchProvider,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngAfterViewInit(): void {
    this.prepareOverlay();
  }

  prepareOverlay(): void {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: ['cdk-overlay-backdrop', 'cdk-overlay-dark-backdrop'],
      panelClass: ['topbar-panel'],
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick().pipe(untilDestroyed(this)).subscribe(() => this.detachOverlay());
  }

  showOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      return;
    }

    const searchResultsPortal = new ComponentPortal(GlobalSearchComponent, this.viewContainerRef);
    this.overlayRef.attach(searchResultsPortal);
    this.cdr.markForCheck();

    this.searchProvider.selectionChanged$
      .pipe(take(1), delay(searchDelayConst), untilDestroyed(this))
      .subscribe(() => this.detachOverlay());
  }

  detachOverlay(): void {
    this.overlayRef.detach();

    const element = this.document.querySelector('ix-logo a');

    if (element instanceof HTMLAnchorElement) {
      element.focus();
    }

    this.cdr.markForCheck();
  }
}
