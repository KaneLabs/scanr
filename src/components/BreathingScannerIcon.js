import React, { useEffect, useState, useRef } from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';
import { primaryColorOpaque } from 'constants';
import { Animated, Easing } from 'react-native';
import * as Animatable from 'react-native-animatable';

const AnimatedIcon = Animatable.createAnimatableComponent(IonIcon);

export const BreathingScannerIcon = () => {
  const iconRef = useRef();

  useEffect(() => {
    iconRef.current.pulse(2000);
    const intervalId = setInterval(() => iconRef.current.pulse(2000), 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Animated.View>
      <AnimatedIcon
        ref={iconRef}
        name="ios-qr-scanner"
        size={280}
        color={primaryColorOpaque}
      />
    </Animated.View>
  );
};
