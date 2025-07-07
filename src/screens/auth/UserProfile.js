import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar,
    ScrollView,
    Animated
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function UserProfile() {
    const [activeTab, setActiveTab] = useState('overview');
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(30)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const menuItems = [
        { id: 'bookings', title: 'My Bookings', icon: 'hotel', count: 12 },
        { id: 'favorites', title: 'Favorites', icon: 'favorite', count: 8 },
        { id: 'rewards', title: 'Rewards Points', icon: 'stars', count: '2,450' },
        { id: 'settings', title: 'Settings', icon: 'settings', count: null },
        { id: 'support', title: 'Support', icon: 'help-outline', count: null },
        { id: 'payment', title: 'Payment Methods', icon: 'credit-card', count: 3 },
    ];

    const recentBookings = [
        { id: 1, hotel: 'Grand Palace Hotel', location: 'New York', date: 'Dec 15-18, 2024', status: 'Confirmed' },
        { id: 2, hotel: 'Ocean View Resort', location: 'Miami', date: 'Nov 22-25, 2024', status: 'Completed' },
        { id: 3, hotel: 'Mountain Lodge', location: 'Colorado', date: 'Oct 10-12, 2024', status: 'Completed' },
    ];

    const achievements = [
        { id: 1, title: 'Frequent Traveler', description: '10+ bookings', icon: 'airplane', color: '#FFD700' },
        { id: 2, title: 'Luxury Explorer', description: '5-star stays', icon: 'diamond', color: '#FF6B9D' },
        { id: 3, title: 'Review Master', description: '50+ reviews', icon: 'comment-text', color: '#4ECDC4' },
    ];

    const navigation = useNavigation();

    const handleMenuPress = (itemId) => {
        if (itemId === 'bookings') {
            navigation.navigate('OrderHistory');
        }
    };


    const renderOverview = () => (
        <Animated.View style={[styles.tabContent, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                    <LinearGradient
                        colors={['#FF6B9D', '#FF8E8E']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.statGradient}
                    >
                        <FontAwesome5 name="hotel" size={24} color={COLORS.WHITE} />
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Total No of Stays</Text>
                    </LinearGradient>
                </View>

                <View style={styles.statCard}>
                    <LinearGradient
                        colors={['#4ECDC4', '#44A08D']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.statGradient}
                    >
                        <MaterialCommunityIcons name="star-circle" size={24} color={COLORS.WHITE} />
                        <Text style={styles.statNumber}>2,450</Text>
                        <Text style={styles.statLabel}>Reward Points</Text>
                    </LinearGradient>
                </View>

                <View style={styles.statCard}>
                    <LinearGradient
                        colors={['#A8E6CF', '#7FCDCD']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.statGradient}
                    >
                        <MaterialCommunityIcons name="trophy" size={24} color={COLORS.WHITE} />
                        <Text style={styles.statNumber}>Gold</Text>
                        <Text style={styles.statLabel}>Member Level</Text>
                    </LinearGradient>
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Recent Bookings</Text>
                {recentBookings.map((booking) => (
                    <View key={booking.id} style={styles.bookingCard}>
                        <View style={styles.bookingInfo}>
                            <Text style={styles.bookingHotel}>{booking.hotel}</Text>
                            <Text style={styles.bookingLocation}>{booking.location}</Text>
                            <Text style={styles.bookingDate}>{booking.date}</Text>
                        </View>
                        <View style={[
                            styles.statusBadge,
                                { backgroundColor: booking.status === 'Confirmed' ? '#4ECDC4' : '#A8E6CF' }
                            ]}
                        >
                            <Text style={styles.statusText}>{booking.status}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <View style={styles.achievementsContainer}>
                {achievements.map((achievement) => (
                    <View key={achievement.id} style={styles.achievementCard}>
                        <View style={[styles.achievementIcon, { backgroundColor: achievement.color }]}>
                            <MaterialCommunityIcons name={achievement.icon} size={20} color={COLORS.WHITE} />
                        </View>
                        <Text style={styles.achievementTitle}>{achievement.title}</Text>
                        <Text style={styles.achievementDesc}>{achievement.description}</Text>
                    </View>
                ))}
                </View>
            </View>
        </Animated.View>
    );

    const renderSettings = () => (
        <Animated.View style={[styles.tabContent, { opacity: fadeAnim }]}>
            <View style={styles.menuContainer}>
                {menuItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.menuItem}
                        onPress={() => handleMenuPress(item.id)}
                    >
                        <View style={styles.menuItemLeft}>
                            <View style={styles.menuIconContainer}>
                                <Icon name={item.icon} size={24} color={COLORS.LIGHT_BLUE} />
                            </View>
                            <Text style={styles.menuItemText}>{item.title}</Text>
                        </View>
                        <View style={styles.menuItemRight}>
                            {item.count && (
                                <View style={styles.countBadge}>
                                    <Text style={styles.countText}>{item.count}</Text>
                                </View>
                            )}
                            <Icon name="chevron-right" size={20} color="#999" />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </Animated.View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.LIGHT_BLUE} />
        
            <LinearGradient
                colors={['#0D7EFE', '#1B86FF', '#2B94FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
                                style={styles.avatarGradient}
                            >
                                <Image
                                    source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }}
                                    style={styles.avatar}
                                />
                            </LinearGradient>
                            <TouchableOpacity style={styles.editButton}>
                                <Icon name="edit" size={16} color={COLORS.WHITE} />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>John Anderson</Text>
                            <Text style={styles.userEmail}>john.anderson@email.com</Text>
                            <View style={styles.membershipBadge}>
                                <MaterialCommunityIcons name="crown" size={16} color="#FFD700" />
                                <Text style={styles.membershipText}>Gold Member</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Icon name="notifications" size={24} color={COLORS.WHITE} />
                        <View style={styles.notificationDot} />
                    </TouchableOpacity>
                </View>
            </LinearGradient>

            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
                    onPress={() => setActiveTab('overview')}
                >
                    <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
                        Overview
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
                    onPress={() => setActiveTab('settings')}
                >
                    <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
                        Settings
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {activeTab === 'overview' ? renderOverview() : renderSettings()}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatarGradient: {
        width: 80,
        height: 80,
        borderRadius: 40,
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        width: 74,
        height: 74,
        borderRadius: 37,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.LIGHT_BLUE,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.WHITE,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 22,
        fontWeight: '700',
        color: COLORS.WHITE,
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 8,
    },
    membershipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    membershipText: {
        color: COLORS.WHITE,
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    notificationButton: {
        position: 'relative',
        padding: 8,
    },
    notificationDot: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF6B9D',
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.WHITE,
        marginHorizontal: 20,
        marginTop: -15,
        borderRadius: 15,
        padding: 4,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: COLORS.LIGHT_BLUE,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    activeTabText: {
        color: COLORS.WHITE,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    tabContent: {
        flex: 1,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    statCard: {
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 15,
        overflow: 'hidden',
    },
    statGradient: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.WHITE,
        marginTop: 8,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.WHITE,
        opacity: 0.9,
        textAlign: 'center',
    },
    sectionContainer: {
        marginBottom: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.BLACK,
        marginBottom: 15,
    },
    bookingCard: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    bookingInfo: {
        flex: 1,
    },
    bookingHotel: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.BLACK,
        marginBottom: 4,
    },
    bookingLocation: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    bookingDate: {
        fontSize: 12,
        color: '#999',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.WHITE,
    },
    achievementsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    achievementCard: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
        padding: 15,
        alignItems: 'center',
        marginHorizontal: 4,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    achievementIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    achievementTitle: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.BLACK,
        textAlign: 'center',
        marginBottom: 4,
    },
    achievementDesc: {
        fontSize: 10,
        color: '#666',
        textAlign: 'center',
    },
    menuContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.ALICE_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    menuItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.BLACK,
    },
    menuItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countBadge: {
        backgroundColor: COLORS.LIGHT_BLUE,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 8,
        minWidth: 24,
        alignItems: 'center',
    },
    countText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.WHITE,
    },
});