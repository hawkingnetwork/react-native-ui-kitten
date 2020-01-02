import {
  styled,
  StyledComponentProps as IStyledComponentProps,
  StyledComponentClass as IStyledComponentClass
} from "./style/styleConsumer.component";

export { styled };
export type StyledComponentProps = IStyledComponentProps;
export type StyledComponentClass<P> = IStyledComponentClass<P>;

import {
  withStyles,
  ThemedComponentProps as IThemedComponentProps,
  ThemedComponentClass as IThemedComponentClass
} from "./theme/themeConsumer.component";

export { withStyles };
export type ThemedComponentProps = IThemedComponentProps;
export type ThemedComponentClass<P> = IThemedComponentClass<P>;

import {
  ApplicationProvider,
  ApplicationProviderProps as IApplicationProviderProps,
  ApplicationProviderElement as IApplicationProviderElement
} from "./application/applicationProvider.component";

export { ApplicationProvider };
export type ApplicationProviderProps = IApplicationProviderProps;
export type ApplicationProviderElement = IApplicationProviderElement;

import {
  ModalPanel,
  ModalPanelProps as IModalPanelProps
} from "./modal/modalPanel.component";

export { ModalPanel };
export type ModalPanelProps = IModalPanelProps;

import {
  ThemeProvider,
  ThemeProviderProps as IThemeProviderProps
} from "./theme/themeProvider.component";

export { ThemeProvider };
export type ThemeProviderProps = IThemeProviderProps;

export { ModalService, ModalPresentingConfig } from "./modal/modal.service";

import { Interaction, State, StyleType as IStyleType } from "./style/type";

export { Interaction, State };
export type StyleType = IStyleType;

export { ThemeType, ThemedStyleType, StyleSheetType } from "./theme/type";
