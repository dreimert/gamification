import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideAnimations } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { CredsInterceptorProvider } from "./services/creds.interceptor";
import { SessExpiredInterceptorProvider } from "./services/sessexpired.interceptor";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideAnimations(),
        provideAnimations(),
        importProvidersFrom(HttpClientModule),
        CredsInterceptorProvider,
        SessExpiredInterceptorProvider,
    ],
};
