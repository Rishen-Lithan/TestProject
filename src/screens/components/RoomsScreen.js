import { View, Text, ScrollView, TextInput, TouchableOpacity, FlatList, Dimensions, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../styles/Colors'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')

const roomsData = [
  {
    id: 1,
    name: 'Deluxe Ocean View',
    price: 299,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.8,
    features: ['Ocean View', 'King Bed', 'Balcony', 'WiFi'],
    guests: 2,
    size: '45 sqm',
    available: true
  },
  {
    id: 2,
    name: 'Executive Suite',
    price: 499,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    features: ['Living Room', 'Kitchenette', 'City View', 'Workspace'],
    guests: 4,
    size: '85 sqm',
    available: true
  },
  {
    id: 3,
    name: 'Standard Room',
    price: 149,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.5,
    features: ['Queen Bed', 'Garden View', 'AC', 'Mini Bar'],
    guests: 2,
    size: '25 sqm',
    available: true
  },
  {
    id: 4,
    name: 'Presidential Suite',
    price: 899,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 5.0,
    features: ['Jacuzzi', 'Private Terrace', 'Butler Service', 'Dining Room'],
    guests: 6,
    size: '120 sqm',
    available: false
  },
  {
    id: 5,
    name: 'Family Room',
    price: 249,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.7,
    features: ['Bunk Beds', 'Play Area', 'Connecting Rooms', 'Child Safety'],
    guests: 5,
    size: '60 sqm',
    available: true
  },
  {
    id: 6,
    name: 'Honeymoon Suite',
    price: 399,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    rating: 4.9,
    features: ['Romantic Setup', 'Champagne', 'Rose Petals', 'Spa Bath'],
    guests: 2,
    size: '50 sqm',
    available: true
  }
]

export default function RoomsScreen() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRooms, setFilteredRooms] = useState(roomsData)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const navigation = useNavigation();

  useEffect(() => {
    filterRooms()
  }, [searchQuery, selectedFilter])

  const filterRooms = () => {
    let filtered = roomsData

    if (searchQuery) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }

    if (selectedFilter === 'available') {
      filtered = filtered.filter(room => room.available)
    } else if (selectedFilter === 'unavailable') {
      filtered = filtered.filter(room => !room.available)
    }

    setFilteredRooms(filtered)
  }

  const RoomCard = ({ room }) => (
    <TouchableOpacity style={styles.roomCard} activeOpacity={0.9} onPress={() => navigation.navigate('RoomDetailsScreen')}>
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          >
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>${room.price}</Text>
              <Text style={styles.perNight}>per night</Text>
            </View>
            {!room.available && (
              <View style={styles.unavailableOverlay}>
                <Text style={styles.unavailableText}>Unavailable</Text>
              </View>
            )}
          </LinearGradient>
        </View>

        <View style={styles.roomDetails}>
          <View style={styles.roomHeader}>
            <Text style={styles.roomName}>{room.name}</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{room.rating}</Text>
            </View>
          </View>

          <View style={styles.roomInfo}>
            <View style={styles.infoItem}>
              <Icon name="people" size={16} color={COLORS.LIGHT_BLUE} />
              <Text style={styles.infoText}>{room.guests} guests</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="square-foot" size={16} color={COLORS.LIGHT_BLUE} />
              <Text style={styles.infoText}>{room.size}</Text>
            </View>
          </View>

          <View style={styles.featuresContainer}>
            {room.features.slice(0, 3).map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
            {room.features.length > 3 && (
              <View style={styles.featureTag}>
                <Text style={styles.featureText}>+{room.features.length - 3}</Text>
              </View>
            )}
          </View>

          <TouchableOpacity 
            style={[styles.bookButton, !room.available && styles.disabledButton]}
            disabled={!room.available}
          >
            <Text style={[styles.bookButtonText, !room.available && styles.disabledButtonText]}>
              {room.available ? 'Book Now' : 'Unavailable'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  const FilterButton = ({ title, value, active }) => (
    <TouchableOpacity
      style={[styles.filterButton, active && styles.activeFilterButton]}
      onPress={() => setSelectedFilter(value)}
    >
      <Text style={[styles.filterButtonText, active && styles.activeFilterButtonText]}>
        {title}
      </Text>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[COLORS.LIGHT_BLUE, '#0B5FD1']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Available Rooms</Text>
          <Text style={styles.headerSubtitle}>Find your perfect stay</Text>
        </View>
      </LinearGradient>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color={COLORS.LIGHT_BLUE} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rooms or features..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="clear" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <FilterButton title="All Rooms" value="all" active={selectedFilter === 'all'} />
          <FilterButton title="Available" value="available" active={selectedFilter === 'available'} />
          <FilterButton title="Unavailable" value="unavailable" active={selectedFilter === 'unavailable'} />
        </ScrollView>
      </View>

      <FlatList
        data={filteredRooms}
        renderItem={({ item }) => <RoomCard room={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.roomsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="hotel" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No rooms found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.ALICE_BLUE,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.WHITE,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  activeFilterButton: {
    backgroundColor: COLORS.LIGHT_BLUE,
    borderColor: COLORS.LIGHT_BLUE,
  },
  filterButtonText: {
    color: COLORS.BLACK,
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterButtonText: {
    color: COLORS.WHITE,
  },
  roomsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  roomCard: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    position: 'relative',
  },
  imageGradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  priceTag: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.LIGHT_BLUE,
  },
  perNight: {
    fontSize: 12,
    color: '#666',
  },
  unavailableOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: {
    color: COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomDetails: {
    padding: 20,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.ALICE_BLUE,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  roomInfo: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  featureTag: {
    backgroundColor: COLORS.ALICE_BLUE,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.LIGHT_BLUE,
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: COLORS.LIGHT_BLUE,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#999',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 15,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
})