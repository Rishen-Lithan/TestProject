import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar, ScrollView,
    Animated, Easing
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import COLORS from '../../styles/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [focusedInput, setFocusedInput] = useState(null);

    const navigation = useNavigation();

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 800,
                easing: Easing.out(Easing.back(1.5)),
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 800,
                easing: Easing.out(Easing.back(1.2)),
                useNativeDriver: true,
            }),
        ]).start();

        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSignup = () => {
        console.log('Signup pressed', formData);
        navigation.navigate('MainNavigator');
    };

    const handleSocialLogin = (provider) => {
        console.log(`${provider} login pressed`);
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <SafeAreaView 
            style={styles.container}
        >
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <View style={styles.backgroundContainer}>
                <LinearGradient
                    colors={['#0D7EFE', '#1B86FF', '#2B94FF', '#3BA2FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFillObject}
                />
                
                <Animated.View 
                    style={[
                        styles.floatingElement,
                        styles.floatingElement1,
                        { transform: [{ rotate }] }
                    ]}
                    />
                    <Animated.View 
                    style={[
                        styles.floatingElement,
                        styles.floatingElement2,
                        { transform: [{ rotate: rotate }] }
                    ]}
                    />
                    <Animated.View 
                    style={[
                        styles.floatingElement,
                        styles.floatingElement3,
                        { transform: [{ rotate }] }
                    ]}
                />
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                <Animated.View 
                    style={[
                        styles.header,
                        {
                        opacity: fadeAnim,
                        transform: [
                            { translateY: slideAnim },
                            { scale: scaleAnim }
                        ]
                        }
                    ]}
                >
                    <View style={styles.logoContainer}>
                        <LinearGradient
                            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                            style={styles.logoBackground}
                        >
                            <Icon name="business" size={40} color={COLORS.WHITE} />
                        </LinearGradient>
                    </View>
                    <Text style={styles.headerTitle}>Luxe Hotels</Text>
                    <Text style={styles.headerSubtitle}>Create your premium account</Text>
                </Animated.View>

                <Animated.View 
                    style={[
                        styles.formCard,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}
                >
                    <LinearGradient
                        colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.9)']}
                        style={styles.glassCard}
                    >
                        <View style={styles.formContent}>
                            <View style={[
                                styles.inputContainer,
                                focusedInput === 'fullName' && styles.inputFocused
                            ]}>
                                <LinearGradient
                                    colors={focusedInput === 'fullName' ? 
                                        ['rgba(13,126,254,0.1)', 'rgba(13,126,254,0.05)'] : 
                                        ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.01)']
                                    }
                                    style={styles.inputGradient}
                                >
                                    <Feather name="user" size={20} color={COLORS.LIGHT_BLUE} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Full Name"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        value={formData.fullName}
                                        onChangeText={(value) => handleInputChange('fullName', value)}
                                        onFocus={() => setFocusedInput('fullName')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[
                                styles.inputContainer,
                                focusedInput === 'email' && styles.inputFocused
                            ]}>
                                <LinearGradient
                                    colors={focusedInput === 'email' ? 
                                        ['rgba(13,126,254,0.1)', 'rgba(13,126,254,0.05)'] : 
                                        ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.01)']
                                    }
                                    style={styles.inputGradient}
                                >
                                    <Feather name="mail" size={20} color={COLORS.LIGHT_BLUE} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Email Address"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={formData.email}
                                        onChangeText={(value) => handleInputChange('email', value)}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[
                                styles.inputContainer,
                                focusedInput === 'phone' && styles.inputFocused
                            ]}>
                                <LinearGradient
                                    colors={focusedInput === 'phone' ? 
                                        ['rgba(13,126,254,0.1)', 'rgba(13,126,254,0.05)'] : 
                                        ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.01)']
                                    }
                                    style={styles.inputGradient}
                                >
                                    <Feather name="phone" size={20} color={COLORS.LIGHT_BLUE} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Phone Number"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        keyboardType="phone-pad"
                                        value={formData.phone}
                                        onChangeText={(value) => handleInputChange('phone', value)}
                                        onFocus={() => setFocusedInput('phone')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                </LinearGradient>
                            </View>

                            <View style={[
                                styles.inputContainer,
                                focusedInput === 'password' && styles.inputFocused
                            ]}>
                                <LinearGradient
                                    colors={focusedInput === 'password' ? 
                                        ['rgba(13,126,254,0.1)', 'rgba(13,126,254,0.05)'] : 
                                        ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.01)']
                                    }
                                    style={styles.inputGradient}
                                >
                                    <Feather name="lock" size={20} color={COLORS.LIGHT_BLUE} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Password"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        secureTextEntry={!showPassword}
                                        value={formData.password}
                                        onChangeText={(value) => handleInputChange('password', value)}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Feather
                                            name={showPassword ? 'eye' : 'eye-off'}
                                            size={18}
                                            color="rgba(0,0,0,0.4)"
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                            <View style={[
                                styles.inputContainer,
                                focusedInput === 'confirmPassword' && styles.inputFocused
                            ]}>
                                <LinearGradient
                                    colors={focusedInput === 'confirmPassword' ? 
                                        ['rgba(13,126,254,0.1)', 'rgba(13,126,254,0.05)'] : 
                                        ['rgba(0,0,0,0.02)', 'rgba(0,0,0,0.01)']
                                    }
                                    style={styles.inputGradient}
                                >
                                    <Feather name="lock" size={20} color={COLORS.LIGHT_BLUE} style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.textInput}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="rgba(0,0,0,0.4)"
                                        secureTextEntry={!showConfirmPassword}
                                        value={formData.confirmPassword}
                                        onChangeText={(value) => handleInputChange('confirmPassword', value)}
                                        onFocus={() => setFocusedInput('confirmPassword')}
                                        onBlur={() => setFocusedInput(null)}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Feather
                                            name={showConfirmPassword ? 'eye' : 'eye-off'}
                                            size={18}
                                            color="rgba(0,0,0,0.4)"
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>

                            <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
                                <LinearGradient
                                    colors={['#0D7EFE', '#1B86FF', '#2B94FF']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={styles.signupButtonGradient}
                                >
                                    <Text style={styles.signupButtonText}>Create Account</Text>
                                    <Feather name="arrow-right" size={20} color={COLORS.WHITE} style={styles.buttonIcon} />
                                </LinearGradient>
                            </TouchableOpacity>

                            <View style={styles.dividerContainer}>
                                <View style={styles.dividerLine} />
                                <LinearGradient
                                    colors={['rgba(13,126,254,0.1)', 'rgba(13,126,254,0.05)']}
                                    style={styles.dividerTextContainer}
                                >
                                    <Text style={styles.dividerText}>or continue with</Text>
                                </LinearGradient>
                                <View style={styles.dividerLine} />
                            </View>

                            <View style={styles.socialContainer}>
                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialLogin('Google')}
                                >
                                    <FontAwesome name="google" size={22} color="#DB4437" />
                                    <Text style={styles.socialButtonText}>Google</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.socialButton}
                                    onPress={() => handleSocialLogin('Apple')}
                                >
                                    <FontAwesome name="apple" size={22} color={COLORS.BLACK} />
                                    <Text style={styles.socialButtonText}>Apple</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.loginContainer}>
                                <Text style={styles.loginText}>Already have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.loginLink}>Sign In</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </LinearGradient>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.LIGHT_BLUE,
    },
    backgroundContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    floatingElement: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 50,
    },
    floatingElement1: {
        width: 100,
        height: 100,
        top: '20%',
        left: '80%',
        borderRadius: 50,
    },
    floatingElement2: {
        width: 60,
        height: 60,
        top: '50%',
        left: '10%',
        borderRadius: 30,
    },
    floatingElement3: {
        width: 80,
        height: 80,
        top: '70%',
        left: '85%',
        borderRadius: 40,
    },
    scrollContainer: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        paddingTop: 80,
        paddingBottom: 40,
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
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: 'bold',
        color: COLORS.WHITE,
        marginBottom: 8,
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    headerSubtitle: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
    },
    formCard: {
        marginHorizontal: 20,
        marginBottom: 30,
        borderRadius: 30,
        overflow: 'hidden',
    },
    glassCard: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    formContent: {
        padding: 30,
    },
    inputContainer: {
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
    },
    inputFocused: {
        transform: [{ scale: 1.02 }],
    },
    inputGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    inputIcon: {
        marginRight: 15,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.BLACK,
        paddingVertical: 18,
        fontWeight: '500',
    },
    eyeIcon: {
        padding: 8,
    },
    signupButton: {
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: COLORS.LIGHT_BLUE,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 12,
    },
    signupButtonGradient: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signupButtonText: {
        color: COLORS.WHITE,
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    buttonIcon: {
        marginLeft: 10,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    dividerTextContainer: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        marginHorizontal: 15,
    },
    dividerText: {
        fontSize: 14,
        color: 'rgba(0,0,0,0.6)',
        fontWeight: '500',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    socialButton: {
        flex: 1,
        marginHorizontal: 8,
        borderRadius: 16,
        backgroundColor: COLORS.WHITE,
        elevation: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    socialGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    socialButtonText: {
        marginLeft: 12,
        fontSize: 16,
        color: COLORS.BLACK,
        fontWeight: '600',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginText: {
        fontSize: 16,
        color: 'rgba(0,0,0,0.6)',
    },
    loginLinkGradient: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    loginLink: {
        fontSize: 16,
        color: COLORS.LIGHT_BLUE,
        fontWeight: '700',
    },
});