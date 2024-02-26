import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { counterReducer } from './shared/store/counter.reducer';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { blogReducer } from './shared/store/Blog/blog.reducer';
import { Appstate } from './shared/store/global/app.state';
import { provideEffects } from '@ngrx/effects';
import { BlogEffects } from './shared/store/Blog/blog.Effects';
import { provideHttpClient } from '@angular/common/http';
import { provideEntityData, withEffects } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { PostDataService } from './post-dataservice';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(Appstate), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects([BlogEffects]), provideHttpClient(), provideEntityData(entityConfig, withEffects()),PostDataService, provideAnimationsAsync()],
};
