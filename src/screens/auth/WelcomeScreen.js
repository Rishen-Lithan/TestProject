import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Animated, Easing } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../styles/Colors'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

export default function WelcomeScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(50)).current
    const scaleAnim = useRef(new Animated.Value(0.8)).current
    const rotateAnim = useRef(new Animated.Value(0)).current
    const cardAnim1 = useRef(new Animated.Value(0)).current
    const cardAnim2 = useRef(new Animated.Value(0)).current
    const cardAnim3 = useRef(new Animated.Value(0)).current
    const buttonAnim = useRef(new Animated.Value(0)).current
    const titleAnim = useRef(new Animated.Value(-30)).current
    const subtitleAnim = useRef(new Animated.Value(30)).current
    const logoOpacity = useRef(new Animated.Value(0)).current
    const backgroundAnim = useRef(new Animated.Value(0)).current
    const floatingAnim1 = useRef(new Animated.Value(0)).current
    const floatingAnim2 = useRef(new Animated.Value(0)).current

    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(backgroundAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()

        Animated.parallel([
            Animated.timing(logoOpacity, {
                toValue: 1,
                duration: 800,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                delay: 200,
                useNativeDriver: true,
            }),
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1200,
                delay: 200,
                easing: Easing.elastic(1),
                useNativeDriver: true,
            })
        ]).start()

        Animated.parallel([
            Animated.spring(titleAnim, {
                toValue: 0,
                tension: 80,
                friction: 8,
                delay: 600,
                useNativeDriver: true,
            }),
            Animated.spring(subtitleAnim, {
                toValue: 0,
                tension: 80,
                friction: 8,
                delay: 800,
                useNativeDriver: true,
            })
        ]).start()

        Animated.stagger(200, [
            Animated.parallel([
                Animated.timing(cardAnim1, {
                toValue: 1,
                duration: 600,
                delay: 1000,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
                })
            ]),
            Animated.parallel([
                Animated.timing(cardAnim2, {
                toValue: 1,
                duration: 600,
                delay: 1200,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
                })
            ]),
            Animated.parallel([
                Animated.timing(cardAnim3, {
                toValue: 1,
                duration: 600,
                delay: 1400,
                easing: Easing.out(Easing.cubic),
                useNativeDriver: true,
                })
            ])
        ]).start()

        Animated.spring(buttonAnim, {
            toValue: 1,
            tension: 60,
            friction: 8,
            delay: 1600,
            useNativeDriver: true,
        }).start()

        Animated.loop(
            Animated.sequence([
                Animated.timing(floatingAnim1, {
                    toValue: 1,
                    duration: 3000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(floatingAnim1, {
                    toValue: 0,
                    duration: 3000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                })
            ])
        ).start()

        Animated.loop(
            Animated.sequence([
                Animated.timing(floatingAnim2, {
                    toValue: 1,
                    duration: 4000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                }),
                Animated.timing(floatingAnim2, {
                    toValue: 0,
                    duration: 4000,
                    easing: Easing.inOut(Easing.sin),
                    useNativeDriver: true,
                })
            ])
        ).start()
    }, [])

    const rotateInterpolated = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    })

    const cardTranslateY1 = cardAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    })

    const cardTranslateY2 = cardAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    })

    const cardTranslateY3 = cardAnim3.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 0],
    })

    const buttonTranslateY = buttonAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [40, 0],
    })

    const floating1TranslateY = floatingAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -15],
    })

    const floating2TranslateY = floatingAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -20],
    })

    const handleNavigation = () => {
        navigation.navigate('Signup');
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.LIGHT_BLUE} barStyle="light-content" />
        
            <Animated.View style={[styles.backgroundContainer, { opacity: backgroundAnim }]}>
                <LinearGradient
                    colors={['#0D7EFE', '#4A90E2', '#E6F4FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                />
            </Animated.View>

            <Animated.View style={[
                styles.floatingElement1,
                { transform: [{ translateY: floating1TranslateY }] }
            ]}>
                <View style={styles.floatingCircle}>
                    <Icon name="room-service" size={24} color={COLORS.LIGHT_BLUE} />
                </View>
            </Animated.View>

            <Animated.View style={[
                styles.floatingElement2,
                { transform: [{ translateY: floating2TranslateY }] }
            ]}>
                <View style={styles.floatingCircle}>
                    <Icon name="delivery-dining" size={24} color={COLORS.LIGHT_BLUE} />
                </View>
            </Animated.View>

        <View style={styles.content}>
            <Animated.View style={[
                styles.logoContainer,
                {
                    opacity: logoOpacity,
                    transform: [
                        { scale: scaleAnim },
                        { rotate: rotateInterpolated }
                    ]
                }
            ]}>
                <LinearGradient
                    colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
                    style={styles.logoBackground}
                >
                    <Icon name="business" size={50} color={COLORS.LIGHT_BLUE} />
                </LinearGradient>
            </Animated.View>

            <Animated.View style={{
                transform: [{ translateY: titleAnim }]
            }}>
                <Text style={styles.title}>Luxe Hotels</Text>
                <Text style={styles.tagline}>Your Gateway to Comfort</Text>
            </Animated.View>

            <Animated.View style={{
                transform: [{ translateY: subtitleAnim }]
            }}>
                <Text style={styles.subtitle}>
                    Book rooms, order food, and enjoy seamless hotel services
                </Text>
            </Animated.View>

            <View style={styles.servicesContainer}>
                <Animated.View style={[
                    styles.serviceCard,
                    {
                        opacity: cardAnim1,
                        transform: [{ translateY: cardTranslateY1 }]
                    }
                ]}>
                    <LinearGradient
                        colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
                        style={styles.cardGradient}
                    >
                        <Icon name="meeting-room" size={28} color={COLORS.LIGHT_BLUE} />
                        <Text style={styles.serviceTitle}>Room Booking</Text>
                        <Text style={styles.serviceDesc}>Luxury stays</Text>
                    </LinearGradient>
                </Animated.View>

                <Animated.View style={[
                    styles.serviceCard,
                    {
                        opacity: cardAnim2,
                        transform: [{ translateY: cardTranslateY2 }]
                    }
                ]}>
                    <LinearGradient
                        colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
                        style={styles.cardGradient}
                    >
                        <Icon name="restaurant" size={28} color={COLORS.LIGHT_BLUE} />
                        <Text style={styles.serviceTitle}>Food Ordering</Text>
                        <Text style={styles.serviceDesc}>Dine in comfort</Text>
                    </LinearGradient>
                </Animated.View>

                <Animated.View style={[
                    styles.serviceCard,
                    {
                        opacity: cardAnim3,
                        transform: [{ translateY: cardTranslateY3 }]
                    }
                ]}>
                    <LinearGradient
                        colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
                        style={styles.cardGradient}
                    >
                        <Icon name="delivery-dining" size={28} color={COLORS.LIGHT_BLUE} />
                        <Text style={styles.serviceTitle}>Food Delivery</Text>
                        <Text style={styles.serviceDesc}>To your door</Text>
                    </LinearGradient>
                </Animated.View>
            </View>

            <Animated.View style={[
                styles.buttonsContainer,
                {
                    opacity: buttonAnim,
                    transform: [{ translateY: buttonTranslateY }]
                }
                ]}
            >
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8} onPress={handleNavigation}>
                    <LinearGradient
                        colors={[COLORS.LIGHT_BLUE, '#0A6CE8']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.buttonGradient}
                    >
                        <Text style={styles.primaryButtonText}>Get Started</Text>
                        <Icon name="arrow-forward" size={20} color={COLORS.WHITE} />
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[
                styles.bottomTagline,
                { opacity: buttonAnim }
                ]}
            >
                <Text style={styles.bottomText}>Experience hospitality redefined</Text>
            </Animated.View>
        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    gradient: {
        flex: 1,
    },
    floatingElement1: {
        position: 'absolute',
        top: height * 0.12,
        right: width * 0.08,
    },
    floatingElement2: {
        position: 'absolute',
        top: height * 0.28,
        left: width * 0.08,
    },
    floatingCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        opacity: 0.8,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25,
    },
    logoContainer: {
        marginBottom: 30,
    },
    logoBackground: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.WHITE,
        textAlign: 'center',
        marginBottom: 5,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    tagline: {
        fontSize: 16,
        color: COLORS.WHITE,
        textAlign: 'center',
        marginBottom: 20,
        opacity: 0.9,
        fontStyle: 'italic',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.WHITE,
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 24,
        opacity: 0.9,
        paddingHorizontal: 10,
    },
    servicesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 40,
        paddingHorizontal: 10,
    },
    serviceCard: {
        flex: 1,
        marginHorizontal: 5,
    },
    cardGradient: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 8,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    serviceTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.LIGHT_BLUE,
        marginTop: 8,
        textAlign: 'center',
    },
    serviceDesc: {
        fontSize: 10,
        color: COLORS.LIGHT_BLUE,
        marginTop: 2,
        textAlign: 'center',
        opacity: 0.7,
    },
    buttonsContainer: {
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        width: '85%',
        height: 55,
        borderRadius: 28,
        elevation: 8,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        marginBottom: 15,
    },
    buttonGradient: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 28,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.WHITE,
        marginRight: 10,
    },
    secondaryButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: COLORS.WHITE,
        backgroundColor: 'transparent',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.WHITE,
    },
    bottomTagline: {
        marginTop: 30,
        alignItems: 'center',
    },
    bottomText: {
        fontSize: 14,
        color: COLORS.WHITE,
        opacity: 0.8,
        fontStyle: 'italic',
    },
})