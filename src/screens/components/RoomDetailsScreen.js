import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet, StatusBar, Animated, Modal } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../styles/Colors'
import { useNavigation } from '@react-navigation/native'

const { width, height } = Dimensions.get('window')

const roomData = {
  id: 1,
  name: 'Deluxe Ocean View Suite',
  price: 299,
  originalPrice: 399,
  images: [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  ],
  rating: 4.8,
  reviews: 124,
  location: 'Floor 12, Ocean Side',
  guests: 2,
  size: '45 sqm',
  beds: 'King Size Bed',
  description: 'Experience luxury at its finest with our Deluxe Ocean View Suite. Wake up to breathtaking panoramic views of the crystal-clear ocean, enjoy premium amenities, and indulge in the spacious comfort of this elegantly designed suite.',
  amenities: [
    { icon: 'wifi', name: 'Free WiFi', description: 'High-speed internet' },
    { icon: 'pool', name: 'Ocean View', description: 'Panoramic sea views' },
    { icon: 'balcony', name: 'Private Balcony', description: 'Furnished terrace' },
    { icon: 'room-service', name: '24/7 Room Service', description: 'Around the clock' },
    { icon: 'local-bar', name: 'Mini Bar', description: 'Premium beverages' },
    { icon: 'hot-tub', name: 'Jacuzzi', description: 'Private hot tub' },
    { icon: 'fitness-center', name: 'Gym Access', description: 'State-of-the-art facility' },
    { icon: 'restaurant', name: 'Complimentary Breakfast', description: 'Gourmet dining' },
    { icon: 'local-laundry-service', name: 'Laundry Service', description: 'Same day service' },
    { icon: 'airport-shuttle', name: 'Airport Transfer', description: 'Complimentary pickup' }
  ],
  policies: [
    'Check-in: 3:00 PM',
    'Check-out: 11:00 AM',
    'Cancellation: Free until 24 hours before',
    'Pets: Not allowed',
    'Smoking: Non-smoking room'
  ],
  highlights: [
    'Panoramic Ocean Views',
    'Private Balcony with Seating',
    'Premium King Size Bed',
    'Marble Bathroom with Jacuzzi',
    'Complimentary Champagne on Arrival'
  ]
}

export default function RoomDetailsScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState('Dec 15-18, 2024')
  const [guests, setGuests] = useState(2)
  const scrollY = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current

  const navigation = useNavigation();

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start()
  }, [])

  const ImageCarousel = () => (
    <View style={styles.imageContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
          if (slide !== currentImageIndex) {
            setCurrentImageIndex(slide)
          }
        }}
        scrollEventThrottle={20}
      >
        {roomData.images.map((image, index) => (
          <View key={index} style={styles.imageSlide}>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.3)']}
              style={styles.imageGradient}
            />
          </View>
        ))}
      </ScrollView>
      
      <View style={styles.imageIndicators}>
        {roomData.images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              index === currentImageIndex && styles.activeIndicator
            ]}
          />
        ))}
      </View>

      <View style={styles.headerActions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Icon 
            name={isFavorite ? "favorite" : "favorite-border"} 
            size={24} 
            color={isFavorite ? "#FF6B6B" : COLORS.WHITE} 
          />
        </TouchableOpacity>
      </View>
    </View>
  )

  const RoomHeader = () => (
    <Animated.View style={[styles.roomHeader, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.headerTop}>
        <View style={styles.titleSection}>
          <Text style={styles.roomName}>{roomData.name}</Text>
          <View style={styles.locationContainer}>
            <Icon name="location-on" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.locationText}>{roomData.location}</Text>
          </View>
        </View>
        <View style={styles.priceSection}>
          <Text style={styles.originalPrice}>${roomData.originalPrice}</Text>
          <Text style={styles.currentPrice}>${roomData.price}</Text>
          <Text style={styles.perNight}>per night</Text>
        </View>
      </View>
      
      <View style={styles.ratingSection}>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={18} color="#FFD700" />
          <Text style={styles.ratingText}>{roomData.rating}</Text>
          <Text style={styles.reviewsText}>({roomData.reviews} reviews)</Text>
        </View>
        <View style={styles.roomSpecs}>
          <View style={styles.specItem}>
            <Icon name="people" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.specText}>{roomData.guests} guests</Text>
          </View>
          <View style={styles.specItem}>
            <Icon name="square-foot" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.specText}>{roomData.size}</Text>
          </View>
        </View>
      </View>
    </Animated.View>
  )

  const HighlightsSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Room Highlights</Text>
      <View style={styles.highlightsContainer}>
        {roomData.highlights.map((highlight, index) => (
          <View key={index} style={styles.highlightItem}>
            <LinearGradient
              colors={[COLORS.LIGHT_BLUE, '#0B5FD1']}
              style={styles.highlightIcon}
            >
              <Icon name="check" size={16} color={COLORS.WHITE} />
            </LinearGradient>
            <Text style={styles.highlightText}>{highlight}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  const AmenitiesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Amenities & Services</Text>
      <View style={styles.amenitiesGrid}>
        {roomData.amenities.map((amenity, index) => (
          <TouchableOpacity key={index} style={styles.amenityCard} activeOpacity={0.8}>
            <View style={styles.amenityIcon}>
              <Icon name={amenity.icon} size={24} color={COLORS.LIGHT_BLUE} />
            </View>
            <Text style={styles.amenityName}>{amenity.name}</Text>
            <Text style={styles.amenityDescription}>{amenity.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const DescriptionSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>About This Room</Text>
      <Text style={styles.descriptionText}>{roomData.description}</Text>
    </View>
  )

  const PoliciesSection = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Policies & Information</Text>
      <View style={styles.policiesContainer}>
        {roomData.policies.map((policy, index) => (
          <View key={index} style={styles.policyItem}>
            <Icon name="info" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.policyText}>{policy}</Text>
          </View>
        ))}
      </View>
    </View>
  )

  const BookingModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showBookingModal}
      onRequestClose={() => setShowBookingModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book Your Stay</Text>
            <TouchableOpacity onPress={() => setShowBookingModal(false)}>
              <Icon name="close" size={24} color={COLORS.BLACK} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.bookingDetails}>
            <Text style={styles.bookingRoomName}>{roomData.name}</Text>
            <Text style={styles.bookingPrice}>${roomData.price} per night</Text>
            
            <View style={styles.bookingRow}>
              <Text style={styles.bookingLabel}>Check-in & Check-out</Text>
              <TouchableOpacity style={styles.bookingInput}>
                <Icon name="calendar-today" size={20} color={COLORS.LIGHT_BLUE} />
                <Text style={styles.bookingInputText}>{selectedDate}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.bookingRow}>
              <Text style={styles.bookingLabel}>Guests</Text>
              <View style={styles.guestCounter}>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => guests > 1 && setGuests(guests - 1)}
                >
                  <Icon name="remove" size={20} color={COLORS.LIGHT_BLUE} />
                </TouchableOpacity>
                <Text style={styles.guestCount}>{guests}</Text>
                <TouchableOpacity 
                  style={styles.counterButton}
                  onPress={() => setGuests(guests + 1)}
                >
                  <Icon name="add" size={20} color={COLORS.LIGHT_BLUE} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          <LinearGradient
            colors={[COLORS.LIGHT_BLUE, '#0B5FD1']}
            style={styles.confirmBookingButton}
          >
            <TouchableOpacity style={styles.confirmBookingTouch}>
              <Text style={styles.confirmBookingText}>Confirm Booking</Text>
              <Icon name="arrow-forward" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <ImageCarousel />
        <View style={styles.contentContainer}>
          <RoomHeader />
          <HighlightsSection />
          <DescriptionSection />
          <AmenitiesSection />
          <PoliciesSection />
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      <LinearGradient
        colors={[COLORS.LIGHT_BLUE, '#0B5FD1']}
        style={styles.floatingBookButton}
      >
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={() => setShowBookingModal(true)}
        >
          <View style={styles.bookButtonContent}>
            <View>
              <Text style={styles.bookButtonPrice}>${roomData.price}</Text>
              <Text style={styles.bookButtonNight}>per night</Text>
            </View>
            <View style={styles.bookButtonAction}>
              <Text style={styles.bookButtonText}>Book Now</Text>
              <Icon name="arrow-forward" size={20} color={COLORS.WHITE} />
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>

      <BookingModal />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    height: height * 0.4,
    position: 'relative',
  },
  imageSlide: {
    width: width,
    height: height * 0.4,
    backgroundColor: '#f0f0f0',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imageIndicators: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.WHITE,
    width: 24,
  },
  headerActions: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
  },
  roomHeader: {
    paddingTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  titleSection: {
    flex: 1,
    paddingRight: 15,
  },
  roomName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  currentPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.LIGHT_BLUE,
  },
  perNight: {
    fontSize: 12,
    color: '#666',
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ALICE_BLUE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  roomSpecs: {
    flexDirection: 'row',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  specText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  section: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 15,
  },
  highlightsContainer: {
    backgroundColor: COLORS.ALICE_BLUE,
    borderRadius: 15,
    padding: 15,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  highlightIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  highlightText: {
    fontSize: 14,
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  amenityCard: {
    width: (width - 60) / 2,
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  amenityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.ALICE_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
    textAlign: 'center',
    marginBottom: 4,
  },
  amenityDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    textAlign: 'justify',
  },
  policiesContainer: {
    backgroundColor: COLORS.ALICE_BLUE,
    borderRadius: 15,
    padding: 15,
  },
  policyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  policyText: {
    fontSize: 14,
    color: COLORS.BLACK,
    marginLeft: 10,
  },
  floatingBookButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  bookButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  bookButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookButtonPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  bookButtonNight: {
    fontSize: 12,
    color: COLORS.WHITE,
    opacity: 0.8,
  },
  bookButtonAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  bookingDetails: {
    marginBottom: 30,
  },
  bookingRoomName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: 5,
  },
  bookingPrice: {
    fontSize: 16,
    color: COLORS.LIGHT_BLUE,
    fontWeight: '500',
    marginBottom: 20,
  },
  bookingRow: {
    marginBottom: 20,
  },
  bookingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  bookingInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  bookingInputText: {
    fontSize: 16,
    color: COLORS.BLACK,
    marginLeft: 10,
  },
  guestCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.ALICE_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestCount: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  confirmBookingButton: {
    borderRadius: 25,
  },
  confirmBookingTouch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  confirmBookingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.WHITE,
  },
  bottomPadding: {
    height: 100,
  },
})