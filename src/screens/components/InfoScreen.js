import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../styles/Colors'

const { width, height } = Dimensions.get('window')

export default function InfoScreen() {
    const handleCall = () => {
        Linking.openURL('tel:+1234567890')
    }

    const handleEmail = () => {
        Linking.openURL('mailto:info@luxe.com')
    }

    const handleWebsite = () => {
        Linking.openURL('https://www.Luxe.com')
    }

    const amenities = [
        { icon: 'pool', title: 'Swimming Pool', description: '24/7 access to infinity pool access' },
        { icon: 'spa', title: 'Spa & Wellness', description: 'Full-service spa with treatments' },
        { icon: 'restaurant', title: 'Fine Dining', description: 'Michelin-starred restaurant here' },
        { icon: 'wifi', title: 'Free WiFi', description: 'High-speed internet throughout' },
        { icon: 'local-parking', title: 'Valet Parking', description: 'Complimentary parking service' },
        { icon: 'fitness-center', title: 'Fitness Center', description: 'State-of-the-art fitness equipment' },
        { icon: 'room-service', title: 'Room Service', description: '24/7 in-room dining offer' },
        { icon: 'business-center', title: 'Business Center', description: 'Meeting rooms & facilities' },
    ]

    const policies = [
        { title: 'Check-in', time: '3:00 PM', icon: 'login' },
        { title: 'Check-out', time: '11:00 AM', icon: 'logout' },
        { title: 'Pet Policy', time: 'Pets Welcome', icon: 'pets' },
        { title: 'Cancellation', time: '24 Hours', icon: 'cancel' },
    ]

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={[COLORS.ALICE_BLUE, COLORS.WHITE]}
                style={styles.gradient}
            >
                <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                    <View style={styles.header}>
                        <LinearGradient
                            colors={[COLORS.LIGHT_BLUE, '#0056B3']}
                            style={styles.headerGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                        >
                            <Icon name="hotel" size={40} color={COLORS.WHITE} />
                            <Text style={styles.headerTitle}>Luxury Hotel</Text>
                            <Text style={styles.headerSubtitle}>Experience Excellence</Text>
                        </LinearGradient>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Contact Information</Text>
                        <View style={styles.contactContainer}>
                            <TouchableOpacity style={styles.contactItem} onPress={handleCall}>
                                <LinearGradient
                                    colors={[COLORS.LIGHT_BLUE, '#0056B3']}
                                    style={styles.contactIcon}
                                >
                                    <Icon name="phone" size={24} color={COLORS.WHITE} />
                                </LinearGradient>
                                <View style={styles.contactText}>
                                    <Text style={styles.contactTitle}>Phone</Text>
                                    <Text style={styles.contactSubtitle}>+1 (234) 567-8900</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.contactItem} onPress={handleEmail}>
                                <LinearGradient
                                    colors={[COLORS.LIGHT_BLUE, '#0056B3']}
                                    style={styles.contactIcon}
                                >
                                    <Icon name="email" size={24} color={COLORS.WHITE} />
                                </LinearGradient>
                                <View style={styles.contactText}>
                                    <Text style={styles.contactTitle}>Email</Text>
                                    <Text style={styles.contactSubtitle}>info@luxuryhotel.com</Text>
                                </View>
                            </TouchableOpacity>

                        <TouchableOpacity style={styles.contactItem} onPress={handleWebsite}>
                            <LinearGradient
                                colors={[COLORS.LIGHT_BLUE, '#0056B3']}
                                style={styles.contactIcon}
                            >
                                <Icon name="language" size={24} color={COLORS.WHITE} />
                            </LinearGradient>
                            <View style={styles.contactText}>
                                <Text style={styles.contactTitle}>Website</Text>
                                <Text style={styles.contactSubtitle}>www.luxuryhotel.com</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.contactItem}>
                            <LinearGradient
                                colors={[COLORS.LIGHT_BLUE, '#0056B3']}
                                style={styles.contactIcon}
                            >
                                <Icon name="location-on" size={24} color={COLORS.WHITE} />
                            </LinearGradient>
                            <View style={styles.contactText}>
                                <Text style={styles.contactTitle}>Address</Text>
                                <Text style={styles.contactSubtitle}>123 Luxury Avenue, City Center</Text>
                            </View>
                        </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hotel Amenities</Text>
                        <View style={styles.amenitiesGrid}>
                            {amenities.map((amenity, index) => (
                                <View key={index} style={styles.amenityCard}>
                                    <LinearGradient
                                        colors={[COLORS.ALICE_BLUE, COLORS.WHITE]}
                                        style={styles.amenityGradient}
                                    >
                                        <View style={styles.amenityIconContainer}>
                                            <Icon name={amenity.icon} size={28} color={COLORS.LIGHT_BLUE} />
                                        </View>
                                        <Text style={styles.amenityTitle}>{amenity.title}</Text>
                                        <Text style={styles.amenityDescription}>{amenity.description}</Text>
                                    </LinearGradient>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hotel Policies</Text>
                        <View style={styles.policiesContainer}>
                            {policies.map((policy, index) => (
                                <View key={index} style={styles.policyCard}>
                                    <LinearGradient
                                        colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
                                        style={styles.policyGradient}
                                    >
                                        <Icon name={policy.icon} size={24} color={COLORS.LIGHT_BLUE} />
                                        <View style={styles.policyText}>
                                            <Text style={styles.policyTitle}>{policy.title}</Text>
                                            <Text style={styles.policyTime}>{policy.time}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>About Us</Text>
                        <View style={styles.aboutCard}>
                            <LinearGradient
                                colors={[COLORS.LIGHT_BLUE, '#0056B3']}
                                style={styles.aboutGradient}
                            >
                                <Text style={styles.aboutText}>
                                    Welcome to Luxury Hotel, where exceptional service meets unparalleled comfort. 
                                    Our commitment to excellence ensures every guest enjoys a memorable stay with 
                                    world-class amenities and personalized attention to detail.
                                </Text>
                            </LinearGradient>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    gradient: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    header: {
        height: 150,
        marginHorizontal: 20,
        marginTop: 20,
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    headerGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.WHITE,
        marginTop: 10,
    },
    headerSubtitle: {
        fontSize: 16,
        color: COLORS.WHITE,
        opacity: 0.9,
        marginTop: 5,
    },
    section: {
        marginHorizontal: 20,
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.BLACK,
        marginBottom: 15,
    },
    contactContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
        padding: 20,
        elevation: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.ALICE_BLUE,
    },
    contactIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    contactText: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    contactSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    amenityCard: {
        width: (width - 60) / 2,
        marginBottom: 15,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    amenityGradient: {
        padding: 20,
        alignItems: 'center',
        minHeight: 140,
    },
    amenityIconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        elevation: 2,
    },
    amenityTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.BLACK,
        textAlign: 'center',
        marginBottom: 5,
    },
    amenityDescription: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        lineHeight: 16,
    },
    policiesContainer: {
        backgroundColor: COLORS.WHITE,
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    policyCard: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.ALICE_BLUE,
    },
    policyGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
    },
    policyText: {
        marginLeft: 15,
        flex: 1,
    },
    policyTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.BLACK,
    },
    policyTime: {
        fontSize: 14,
        color: COLORS.LIGHT_BLUE,
        marginTop: 2,
    },
    aboutCard: {
        borderRadius: 15,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    aboutGradient: {
        padding: 25,
    },
    aboutText: {
        fontSize: 16,
        color: COLORS.WHITE,
        lineHeight: 24,
        textAlign: 'center',
    },
})