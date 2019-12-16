import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  Button,
  ButtonProps,
} from './button.component';
import {
  mapping,
  theme,
} from '../support/tests';

const Mock = (props?: ButtonProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Button {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: ButtonProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

describe('@button: matches snapshot', () => {

  describe('* interaction', () => {

    it('* stateless', () => {
      const component: RenderAPI = renderComponent();
      const { output } = shallow(component.getByType(Button));

      expect(output).toMatchSnapshot();
    });

  });

  describe('* appearance', () => {

    const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    const icon = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          source={iconSource}
          style={style}
        />
      );
    };

    const text: React.ReactText = 'BUTTON';

    it('* empty', () => {
      const component: RenderAPI = renderComponent();
      const { output } = shallow(component.getByType(Button));

      expect(output).toMatchSnapshot();
    });

    it('* icon', () => {
      const component: RenderAPI = renderComponent({ icon });
      const { output } = shallow(component.getByType(Button));

      expect(output).toMatchSnapshot();
    });

    it('* text', () => {
      const component: RenderAPI = renderComponent({ children: text });
      const { output } = shallow(component.getByType(Button));

      expect(output).toMatchSnapshot();
    });

    it('* icon and text', () => {
      const component: RenderAPI = renderComponent({
        icon,
        children: text,
      });
      const { output } = shallow(component.getByType(Button));

      expect(output).toMatchSnapshot();
    });

    it('* icon and text (styled)', () => {
      const component: RenderAPI = renderComponent({
        icon,
        children: text,
        size: 'giant',
        textStyle: {
          fontSize: 32,
          lineHeight: 34,
        },
      });
      const { output } = shallow(component.getByType(Button));

      expect(output).toMatchSnapshot();
    });

  });

});

describe('@button: component checks', () => {

  it('* emits onPress', () => {
    const onPress = jest.fn();

    const component: RenderAPI = renderComponent({
      onPress: onPress,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onPress).toBeCalled();
  });

});
