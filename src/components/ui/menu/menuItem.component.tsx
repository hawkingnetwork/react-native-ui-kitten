/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { IconElement } from '../icon/icon.component';
import { TouchableIndexedProps } from '../support/typings/type';
import {
  allWithPrefix,
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export interface MenuItemType {
  title: string;
  disabled?: boolean;
  subItems?: MenuItemType[];
  titleStyle?: StyleProp<TextStyle>;
  menuIndex?: number;
  icon?: (style: StyleType) => IconElement;
  accessory?: (style: StyleType) => React.ReactElement;
}

export interface MenuItemProps extends StyledComponentProps, TouchableIndexedProps, MenuItemType {
  selected?: boolean;
}

export type MenuItemElement = React.ReactElement<MenuItemProps>;

/**
 * `MenuItem` is a support component for `Menu`.
 *
 * @extends React.Component
 *
 * @property {string} title - Determines the title of the ListItem.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {(style: StyleType) => ReactElement} accessory - Determines the accessory of the component.
 *
 * @property {(style: ImageStyle) => ReactElement} icon - Determines the icon of the component.
 *
 * @property {MenuItemType[]} subItems - Determines the sub-items of the MenuItem.
 *
 * @property {(index: number, event: GestureResponderEvent) => void} onPress - Emits when component is pressed.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 */
class MenuItemComponent extends React.Component<MenuItemProps> implements WebEventResponderCallbacks {

  static styledComponentName: string = 'MenuItem';

  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.props.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.dispatch([]);
  };

  public onFocus = (): void => {
    this.props.dispatch([Interaction.FOCUSED]);
  };

  public onBlur = (): void => {
    this.props.dispatch([]);
  };

  private onPress = (event: GestureResponderEvent): void => {
    if (this.props.onPress) {
      this.props.onPress(this.props.menuIndex, event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(this.props.menuIndex, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(this.props.menuIndex, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent): void => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props.menuIndex, event);
    }
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    const { paddingHorizontal, paddingVertical, backgroundColor } = style;

    const titleStyles: StyleType = allWithPrefix(style, 'title');
    const indicatorStyles: StyleType = allWithPrefix(style, 'indicator');
    const iconStyles: StyleType = allWithPrefix(style, 'icon');

    return {
      container: {
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        backgroundColor: backgroundColor,
      },
      title: {
        marginHorizontal: titleStyles.titleMarginHorizontal,
        fontFamily: titleStyles.titleFontFamily,
        fontSize: titleStyles.titleFontSize,
        fontWeight: titleStyles.titleFontWeight,
        lineHeight: titleStyles.titleLineHeight,
        color: titleStyles.titleColor,
      },
      indicator: {
        width: indicatorStyles.indicatorWidth,
        backgroundColor: indicatorStyles.indicatorBackgroundColor,
      },
      icon: {
        width: iconStyles.iconWidth,
        height: iconStyles.iconHeight,
        marginHorizontal: iconStyles.iconMarginHorizontal,
        tintColor: iconStyles.iconTintColor,
      },
    };
  };

  private renderIcon = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      style: [style, iconElement.props.style],
    });
  };

  private renderTitle = (style: StyleType): TextElement => {
    const { title, titleStyle } = this.props;

    return (
      <Text style={[style, titleStyle]}>{title}</Text>
    );
  };

  private renderAccessory = (style: StyleType): IconElement => {
    return this.props.accessory(style);
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { title, icon, accessory } = this.props;

    return [
      icon && this.renderIcon(style.icon),
      title && this.renderTitle(style.title),
      accessory && this.renderAccessory(style.icon),
    ];
  };

  public render(): React.ReactNode {
    const { themedStyle, style, ...restProps } = this.props;
    const { container, indicator, ...restStyles } = this.getComponentStyles(themedStyle);
    const [iconElement, textElement, accessoryElement] = this.renderComponentChildren(restStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.container, container, webStyles.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        <View style={[styles.indicator, indicator]}/>
        <View style={styles.subContainer}>
          {iconElement}
          {textElement}
        </View>
        {accessoryElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

export const MenuItem = styled<MenuItemProps>(MenuItemComponent);
