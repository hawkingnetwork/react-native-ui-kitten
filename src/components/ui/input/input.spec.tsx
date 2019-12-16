import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  Input,
  InputProps,
} from './input.component';
import {
  mapping,
  theme,
} from '../support/tests';

const Mock = (props?: InputProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Input {...props}/>
    </ApplicationProvider>
  );
};

const renderComponent = (props?: InputProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

describe('@input: native methods', () => {

  const RefMock = React.forwardRef((props: InputProps, ref: React.Ref<TextInput>) => {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Input ref={ref} {...props}/>
      </ApplicationProvider>
    );
  });

  it('* focus', () => {
    const componentRef: React.RefObject<TextInput> = React.createRef();
    render(
      <RefMock ref={componentRef}/>,
    );

    expect(componentRef.current.focus).toBeTruthy();
  });

  it('* blur', () => {
    const componentRef: React.RefObject<TextInput> = React.createRef();
    render(
      <RefMock ref={componentRef}/>,
    );

    expect(componentRef.current.blur).toBeTruthy();
  });

  it('* isFocused', () => {
    const componentRef: React.RefObject<TextInput> = React.createRef();
    render(
      <RefMock ref={componentRef}/>,
    );

    expect(componentRef.current.isFocused).toBeTruthy();
  });

  it('* clear', () => {
    const componentRef: React.RefObject<TextInput> = React.createRef();
    render(
      <RefMock ref={componentRef}/>,
    );

    expect(componentRef.current.clear).toBeTruthy();
  });
});

describe('@input: matches snapshot', () => {

  describe('* interaction', () => {

    it('* stateless', () => {
      const component: RenderAPI = renderComponent();

      const { output } = shallow(component.getByType(Input));

      expect(output).toMatchSnapshot();
    });

  });

  describe('* appearance', () => {

    it('* icon', () => {
      const icon = (style: StyleType): React.ReactElement<ImageProps> => {
        return (
          <Image
            style={style}
            source={iconSource}
          />
        );
      };

      const component: RenderAPI = renderComponent({ icon });

      const { output } = shallow(component.getByType(Input));

      expect(output).toMatchSnapshot();
    });

    it('* label + caption', () => {
      const captionIcon = (style: StyleType): React.ReactElement<ImageProps> => {
        return (
          <Image
            style={style}
            source={iconSource}
          />
        );
      };
      const label: string = 'Label';
      const caption: string = 'Caption Text';

      const component: RenderAPI = renderComponent({
        label,
        caption,
        captionIcon,
      });

      const { output } = shallow(component.getByType(Input));

      expect(output).toMatchSnapshot();
    });

    it('* text styled', () => {
      const captionIcon = (style: StyleType): React.ReactElement<ImageProps> => {
        return (
          <Image
            style={style}
            source={iconSource}
          />
        );
      };
      const label: string = 'Label';
      const caption: string = 'Caption Text';

      const component: RenderAPI = renderComponent({
        label,
        caption,
        captionIcon,
        textStyle: {
          fontSize: 24,
          lineHeight: 26,
        },
        labelStyle: { color: 'blue' },
        captionTextStyle: {
          letterSpacing: 8,
          fontFamily: 'opensans-bold',
        },
      });

      const { output } = shallow(component.getByType(Input));

      expect(output).toMatchSnapshot();
    });

  });

});

interface InputListenerState {
  text: string;
}

class InputListener extends React.Component<InputProps, InputListenerState> {

  public state: InputListenerState = {
    text: '',
  };

  private onChangeText = (text: string) => {
    this.setState({ text });
  };

  public render(): React.ReactNode {
    return (
      <Mock
        {...this.props}
        value={this.state.text}
        onChangeText={this.onChangeText}
      />
    );
  }
}

describe('@input: component checks', () => {

  it('* emits onChangeText', () => {
    const onChangeText = jest.fn();

    const component: RenderAPI = renderComponent({ onChangeText });

    fireEvent.changeText(component.getByType(TextInput), 'it works!');

    expect(onChangeText).toBeCalledWith('it works!');
  });

  it('* emits onFocus', () => {
    const onFocus = jest.fn();

    const component: RenderAPI = renderComponent({ onFocus });

    fireEvent(component.getByType(TextInput), 'focus');

    expect(onFocus).toBeCalled();
  });

  it('* emits onBlur', () => {
    const onBlur = jest.fn();

    const component: RenderAPI = renderComponent({ onBlur });

    fireEvent(component.getByType(TextInput), 'blur');

    expect(onBlur).toBeCalled();
  });

  it('* emits onIconPress', () => {
    const icon = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          style={style}
          source={iconSource}
        />
      );
    };

    const onIconPress = jest.fn();

    const component: RenderAPI = renderComponent({ icon, onIconPress });

    fireEvent.press(component.getByType(TouchableWithoutFeedback));

    expect(onIconPress).toBeCalled();
  });

  it('* changes text', () => {
    const component: RenderAPI = render(
      <InputListener/>,
    );

    const input: ReactTestInstance = component.getByType(TextInput);

    fireEvent.changeText(input, 'it works!');

    const updatedInput: ReactTestInstance = component.getByType(TextInput);

    expect(updatedInput.props.value).toEqual('it works!');
  });

});
