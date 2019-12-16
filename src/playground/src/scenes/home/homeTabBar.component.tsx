import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
} from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '@pg/components/safeAreaLayout';
import {
  GridIcon,
  ListIcon,
} from '@pg/icons';

export const HomeTabBar = ({ navigation }): SafeAreaLayoutElement => {

  const onSelect = (index: number): void => {
    const selectedTabRoute: string = navigation.state.routes[index];
    navigation.navigate(selectedTabRoute.routeName);
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.BOTTOM}>
      <Divider/>
      <BottomNavigation
        appearance='noIndicator'
        selectedIndex={navigation.state.index}
        onSelect={onSelect}>
        <BottomNavigationTab
          title='Components'
          icon={ListIcon}
        />
        <BottomNavigationTab
          title='Samples'
          icon={GridIcon}
        />
      </BottomNavigation>
    </SafeAreaLayout>
  );
};
