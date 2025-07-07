import { 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    StatusBar, 
    Animated, 
    Easing, 
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import GoogleIcon from 'react-native-vector-icons/Ionicons'
import COLORS from '../../styles/Colors'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false)
    const [isPasswordFocused, setIsPasswordFocused] = useState(false)

    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(50)).current
    const logoAnim = useRef(new Animated.Value(0)).current
    const formAnim = useRef(new Animated.Value(0)).current
    const socialAnim = useRef(new Animated.Value(0)).current
    const floatingAnim1 = useRef(new Animated.Value(0)).current
    const floatingAnim2 = useRef(new Animated.Value(0)).current
    const backgroundAnim = useRef(new Animated.Value(0)).current

    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(backgroundAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()

        Animated.parallel([
            Animated.timing(logoAnim, {
                toValue: 1,
                duration: 800,
                delay: 300,
                easing: Easing.elastic(1.2),
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                delay: 300,
                useNativeDriver: true,
            })
        ]).start()

        Animated.timing(formAnim, {
            toValue: 1,
            duration: 700,
            delay: 600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start()

        Animated.timing(socialAnim, {
            toValue: 1,
            duration: 600,
            delay: 900,
            easing: Easing.out(Easing.cubic),
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

    const logoScale = logoAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.5, 1],
    })

    const formTranslateY = formAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [30, 0],
    })

    const socialTranslateY = socialAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 0],
    })

    const floating1TranslateY = floatingAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    })

    const floating2TranslateY = floatingAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -15],
    })

    const floating1Rotate = floatingAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '5deg'],
    })

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
                { 
                    transform: [
                        { translateY: floating1TranslateY },
                        { rotate: floating1Rotate }
                    ] 
                }
            ]}>
                <View style={styles.floatingShape}>
                    <Icon name="security" size={20} color={COLORS.BIVID_BLUE} />
                </View>
            </Animated.View>

            <Animated.View style={[
                styles.floatingElement2,
                { transform: [{ translateY: floating2TranslateY }] }
            ]}>
                <View style={[styles.floatingShape, styles.floatingShape2]}>
                    <Icon name="verified-user" size={18} color={COLORS.BIVID_BLUE} />
                </View>
            </Animated.View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardContainer}
            >
                <ScrollView 
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <Animated.View style={[
                        styles.headerSection,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: logoScale }]
                        }
                    ]}>
                        <View style={styles.logoContainer}>
                            <LinearGradient
                                colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
                                style={styles.logoBackground}
                            >
                                <Icon name="business" size={40} color={COLORS.BIVID_BLUE} />
                            </LinearGradient>
                        </View>
                        <Text style={styles.welcomeTitle}>Welcome Back</Text>
                        <Text style={styles.welcomeSubtitle}>Sign in to your Luxe Hotels account</Text>
                    </Animated.View>

                    <Animated.View style={[
                        styles.formSection,
                        {
                            opacity: formAnim,
                            transform: [{ translateY: formTranslateY }]
                        }
                    ]}>
                        <View style={styles.formContainer}>
                            <View style={styles.inputContainer}>
                                <View style={[
                                    styles.inputWrapper,
                                    isEmailFocused && styles.inputWrapperFocused
                                ]}>
                                <Icon 
                                    name="email" 
                                    size={20} 
                                    color={isEmailFocused ? COLORS.BIVID_BLUE : '#8E8E93'} 
                                    style={styles.inputIcon}
                                />
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Enter your email"
                                    placeholderTextColor="#8E8E93"
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                                </View>
                            </View>

                            <View style={styles.inputContainer}>
                                <View style={[
                                    styles.inputWrapper,
                                    isPasswordFocused && styles.inputWrapperFocused
                                ]}>
                                    <Icon 
                                        name="lock" 
                                        size={20} 
                                        color={isPasswordFocused ? COLORS.BIVID_BLUE : '#8E8E93'} 
                                        style={styles.inputIcon}
                                    />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#8E8E93"
                                        value={password}
                                        onChangeText={setPassword}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        style={styles.eyeIcon}
                                    >
                                        <Icon 
                                            name={showPassword ? "visibility" : "visibility-off"} 
                                            size={20} 
                                            color="#8E8E93" 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.forgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginButton} activeOpacity={0.8} onPress={() => navigation.navigate('MainNavigator')}>
                                <LinearGradient
                                    colors={[COLORS.LIGHT_BLUE, '#0A6CE8']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.loginButtonGradient}
                                >
                                    <Text style={styles.loginButtonText}>Sign In</Text>
                                    <Icon name="arrow-forward" size={20} color={COLORS.WHITE} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    <Animated.View style={[
                        styles.socialSection,
                        {
                        opacity: socialAnim,
                        transform: [{ translateY: socialTranslateY }]
                        }
                    ]}>
                        <View style={styles.dividerContainer}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>Or continue with</Text>
                            <View style={styles.dividerLine} />
                        </View>

                        <View style={styles.socialButtonsContainer}>
                            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={[COLORS.WHITE, '#F8F9FA']}
                                    style={styles.socialButtonGradient}
                                >
                                    <GoogleIcon name="logo-google" size={24} color="#EA4335" />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButton} activeOpacity={0.8}>
                                <LinearGradient
                                    colors={[COLORS.BLACK, '#1C1C1E']}
                                    style={styles.socialButtonGradient}
                                >
                                    <Icon name="apple" size={24} color={COLORS.WHITE} />
                                    <Text style={[styles.socialButtonText, { color: COLORS.WHITE }]}>Apple</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    <Animated.View style={[
                        styles.signUpSection,
                        { opacity: socialAnim }
                    ]}>
                        <Text style={styles.signUpText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                            <Text style={styles.signUpLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        top: height * 0.1,
        right: width * 0.1,
        zIndex: 1,
    },
    floatingElement2: {
        position: 'absolute',
        top: height * 0.15,
        left: width * 0.08,
        zIndex: 1,
    },
    floatingShape: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        opacity: 0.9,
    },
    floatingShape2: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
    },
    keyboardContainer: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        marginBottom: 20,
    },
    logoBackground: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    welcomeTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.WHITE,
        marginBottom: 8,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
    },
    welcomeSubtitle: {
        fontSize: 16,
        color: COLORS.WHITE,
        opacity: 0.9,
        textAlign: 'center',
    },
    formSection: {
        marginBottom: 30,
    },
    formContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 25,
        padding: 25,
        elevation: 10,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 12,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    inputWrapperFocused: {
        borderColor: COLORS.BIVID_BLUE,
        backgroundColor: COLORS.WHITE,
        elevation: 2,
        shadowColor: COLORS.BIVID_BLUE,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    inputIcon: {
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.BLACK,
    },
    eyeIcon: {
        padding: 5,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 25,
    },
    forgotPasswordText: {
        color: COLORS.BIVID_BLUE,
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        borderRadius: 15,
        elevation: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    loginButtonGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
        borderRadius: 15,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.WHITE,
        marginRight: 10,
    },
    socialSection: {
        marginBottom: 30,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.WHITE,
        opacity: 0.3,
    },
    dividerText: {
        color: COLORS.WHITE,
        fontSize: 14,
        paddingHorizontal: 15,
        opacity: 0.8,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    socialButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 15,
        elevation: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
    },
    socialButtonGradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 15,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.BLACK,
        marginLeft: 8,
    },
    signUpSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpText: {
        color: COLORS.WHITE,
        fontSize: 14,
        opacity: 0.8,
    },
    signUpLink: {
        color: COLORS.WHITE,
        fontSize: 14,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
})