import Onboarding from 'react-native-onboarding-swiper'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import React, { Component } from 'react';
import { Image, View, Platform, Button, Text } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const Square = ({ selected }) => {
    let backgroundColor;

    backgroundColor = selected ? '#C62727' : 'rgba(147, 120, 255, 0.16)';

    return (
        <View
            style={{
                width: 9,
                height: 9,
                marginHorizontal: 3,
                borderRadius: 10,
                marginBottom: 200,
                backgroundColor
            }}
        />
    )
}

export default class onboarding extends Component {

    render() {
        const completeOnboarding = async () => {


            this.props.navigation.navigate('Menu');
        }

        return (

            <Onboarding
                // onDone = {completeOnboarding}
                showDone={false}
                DotComponent={Square}
                showNext={false}
                showSkip={false}

                titleStyles={{
                    fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
                    fontSize: 72,
                    color: '#C62727',
                    position: 'relative',
                    bottom: 420,
                    // right: 10,
                    // left: 0

                }}
                subTitleStyles={{
                    fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
                    fontSize: 36,
                    color: '#000',
                    marginTop: 0,
                    paddingTop: 0,
                    marginBottom: 40
                }}
                containerStyles={{
                    //    alignItems: 'center'
                }}
                imageContainerStyles={{
                    paddingBottom: 0,
                    marginTop: 100
                }}
                bottomBarHighlight={false}
                pages={[
                    {
                        backgroundColor: '#FEE2B3',
                        image: <Image source={require('../images/heart.png')} style={{ height: 244, width: 244 }} />,
                        title: 'De: Alice',
                        subtitle: 'Com responsabiidade,\nfaço amor',
                    },
                    {
                        backgroundColor: '#FEE2B3',
                        image: <Image source={require('../images/artist.png')} style={{ height: 244, width: 244 }} />,
                        title: 'De: Alice',
                        subtitle: 'Com amor,\nfaço arte'
                    },
                    {
                        backgroundColor: '#FEE2B3',
                        image: <Image source={require('../images/star.png')} style={{ height: 244, width: 244 }} />,
                        title: 'De: Alice',
                        subtitle: 'Com arte,\nfaço sonho'
                    },
                    {
                        backgroundColor: '#FEE2B3',
                        image: <Image source={require('../images/logo.png')} style={{ height: 280, width: 280, marginRight: 30 }} />,
                        title: 'De: Alice',
                        subtitle: (
                            <>
                                <Text style={{
                                    fontFamily: Platform.OS === 'ios' ? 'Dancing Script Regular' : 'DancingScript-Regular',
                                    fontSize: 36,
                                    color: '#000',
                                    marginTop: 0,
                                    paddingTop: 0,
                                    textAlign: 'center',
                                    marginBottom: 60
                                }}>
                                    Com sonho,{"\n"}faço De: Alice
                                </Text>
                                <Button
                                    title={'Get Started'}
                                    containerViewStyle={{ marginTop: 20 }}
                                    backgroundColor={'white'}
                                    borderRadius={5}
                                    textStyle={{ color: '#003c8f' }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Menu');
                                    }}
                                />
                            </>
                        ),
                        subTitleStyles: { marginBottom: 55 }
                    }
                ]}
            />
        )
    }
}
