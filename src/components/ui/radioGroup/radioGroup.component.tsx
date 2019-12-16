/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { RadioElement } from '../radio/radio.component';

type ChildrenProp = RadioElement | RadioElement[];

export interface RadioGroupProps extends StyledComponentProps, ViewProps {
  children: ChildrenProp;
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export type RadioGroupElement = React.ReactElement<RadioGroupProps>;

/**
 * Renders a group of `Radio` buttons.
 *
 * @extends React.Component
 *
 * @property {ReactElement<RadioProps> | ReactElement<RadioProps>[]} children - Determines radio buttons in group.
 *
 * @property {number} selectedIndex - Determines the index of selected button
 *
 * @property {(index: number) => void} onChange - Fires when selected radio is changed.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example RadioGroupSimpleUsage
 */
class RadioGroupComponent extends React.Component<RadioGroupProps> {

  static styledComponentName: string = 'RadioGroup';

  static defaultProps: Partial<RadioGroupProps> = {
    selectedIndex: -1,
  };

  private onRadioChange = (index: number): void => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { itemMarginVertical, ...containerParameters } = source;

    return {
      container: containerParameters,
      item: {
        marginVertical: itemMarginVertical,
      },
    };
  };

  private renderRadioElements = (source: RadioElement | RadioElement[], style: StyleType): RadioElement[] => {
    return React.Children.map(source, (element: RadioElement, index: number): RadioElement => {
      return React.cloneElement(element, {
        key: index,
        style: [style, element.props.style],
        checked: this.props.selectedIndex === index,
        onChange: () => this.onRadioChange(index),
      });
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const radioElements: RadioElement[] = this.renderRadioElements(children, componentStyle.item);

    return (
      <View
        {...derivedProps}
        style={[componentStyle.container, styles.container, style]}>
        {radioElements}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export const RadioGroup = styled<RadioGroupProps>(RadioGroupComponent);
