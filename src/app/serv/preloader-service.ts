import { Injectable } from '@angular/core';

@Injectable()
export class PreloaderService {
  public count: boolean = false;
  public static fullLoadingCount: number = 0;
  public static smallLoadingCount: number = 0;

  getPreloaderCount(preloaderType = 'full'): number {
    if (preloaderType === 'full') {
      return PreloaderService.fullLoadingCount;
    } else if (preloaderType === 'small') {
      return PreloaderService.smallLoadingCount;
    }
  }

  myFunction() {
    setTimeout(this.showPreloader, 3000);
    this.count = true
  

}
  showPreloader(preloaderType = 'full') {
    if (preloaderType === 'full') {
      PreloaderService.fullLoadingCount++;
    } else if (preloaderType === 'small') {
      PreloaderService.smallLoadingCount++;
    }
  }

  hidePreloader(preloaderType = 'full'){
    if (preloaderType === 'full') {
      PreloaderService.fullLoadingCount--;
    } else if (preloaderType === 'small') {
      PreloaderService.smallLoadingCount--;
    }
  }
}
