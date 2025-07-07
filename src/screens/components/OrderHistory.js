import { 
  View, 
  Text, 
  TextInput, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  StatusBar,
  FlatList,
  Image
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../../styles/Colors'

const { width, height } = Dimensions.get('window')

const sampleBookings = [
  {
    id: '1',
    roomType: 'Deluxe Suite',
    roomNumber: '205',
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    totalAmount: 450.00,
    status: 'Completed',
    bookingDate: '2024-01-10',
    duration: 3,
    paymentMethod: 'Credit Card'
  },
  {
    id: '2',
    roomType: 'Standard Room',
    roomNumber: '101',
    checkIn: '2024-02-20',
    checkOut: '2024-02-22',
    guests: 1,
    totalAmount: 180.00,
    status: 'Completed',
    bookingDate: '2024-02-15',
    duration: 2,
    paymentMethod: 'PayPal'
  },
  {
    id: '3',
    roomType: 'Presidential Suite',
    roomNumber: '501',
    checkIn: '2024-03-05',
    checkOut: '2024-03-10',
    guests: 4,
    totalAmount: 1250.00,
    status: 'Completed',
    bookingDate: '2024-02-28',
    duration: 5,
    paymentMethod: 'Bank Transfer'
  },
  {
    id: '4',
    roomType: 'Family Room',
    roomNumber: '302',
    checkIn: '2024-03-25',
    checkOut: '2024-03-28',
    guests: 3,
    totalAmount: 420.00,
    status: 'Cancelled',
    bookingDate: '2024-03-20',
    duration: 3,
    paymentMethod: 'Credit Card'
  },
  {
    id: '5',
    roomType: 'Ocean View Suite',
    roomNumber: '405',
    checkIn: '2024-04-10',
    checkOut: '2024-04-15',
    guests: 2,
    totalAmount: 750.00,
    status: 'Completed',
    bookingDate: '2024-04-05',
    duration: 5,
    paymentMethod: 'Credit Card'
  }
]

export default function OrderHistory() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredBookings, setFilteredBookings] = useState(sampleBookings)
  const [activeFilter, setActiveFilter] = useState('All')

  const filters = ['All', 'Completed', 'Cancelled']

  useEffect(() => {
    filterBookings()
  }, [searchQuery, activeFilter])

  const filterBookings = () => {
    let filtered = sampleBookings

    if (activeFilter !== 'All') {
      filtered = filtered.filter(booking => booking.status === activeFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.roomType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.roomNumber.includes(searchQuery) ||
        booking.checkIn.includes(searchQuery) ||
        booking.checkOut.includes(searchQuery)
      )
    }

    setFilteredBookings(filtered)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4CAF50'
      case 'Cancelled':
        return '#F44336'
      default:
        return COLORS.LIGHT_BLUE
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return 'check-circle'
      case 'Cancelled':
        return 'cancel'
      default:
        return 'schedule'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  const BookingCard = ({ booking }) => (
    <TouchableOpacity style={styles.bookingCard} activeOpacity={0.9}>
      <LinearGradient
        colors={[COLORS.WHITE, COLORS.ALICE_BLUE]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.cardGradient}
      >
        <View style={styles.cardHeader}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomType}>{booking.roomType}</Text>
            <Text style={styles.roomNumber}>Room {booking.roomNumber}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
            <Icon name={getStatusIcon(booking.status)} size={12} color={COLORS.WHITE} />
            <Text style={styles.statusText}>{booking.status}</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <View style={styles.dateSection}>
            <Icon name="login" size={20} color={COLORS.LIGHT_BLUE} />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Check-in</Text>
              <Text style={styles.dateValue}>{formatDate(booking.checkIn)}</Text>
            </View>
          </View>
          <View style={styles.dateDivider} />
          <View style={styles.dateSection}>
            <Icon name="logout" size={20} color={COLORS.LIGHT_BLUE} />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Check-out</Text>
              <Text style={styles.dateValue}>{formatDate(booking.checkOut)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bookingDetails}>
          <View style={styles.detailRow}>
            <Icon name="people" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.detailText}>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="schedule" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.detailText}>{booking.duration} Night{booking.duration > 1 ? 's' : ''}</Text>
          </View>
          <View style={styles.detailRow}>
            <Icon name="payment" size={16} color={COLORS.LIGHT_BLUE} />
            <Text style={styles.detailText}>{booking.paymentMethod}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.bookingDate}>Booked on {formatDate(booking.bookingDate)}</Text>
          <Text style={styles.totalAmount}>${booking.totalAmount.toFixed(2)}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  )

  const FilterButton = ({ filter }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text style={[
        styles.filterText,
        activeFilter === filter && styles.activeFilterText
      ]}>
        {filter}
      </Text>
    </TouchableOpacity>
  )

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="history" size={80} color={COLORS.ALICE_BLUE} />
      <Text style={styles.emptyStateTitle}>No bookings found</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery ? 'Try adjusting your search terms' : 'Your booking history will appear here'}
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.LIGHT_BLUE} barStyle="light-content" />
      
      <LinearGradient
        colors={[COLORS.LIGHT_BLUE, '#0A6BD9']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Order History</Text>
          <Text style={styles.headerSubtitle}>Your booking journey</Text>
        </View>
      </LinearGradient>

      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={24} color={COLORS.LIGHT_BLUE} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by room type, number, or date..."
            placeholderTextColor="#B0BEC5"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Icon name="clear" size={20} color={COLORS.LIGHT_BLUE} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {filters.map(filter => (
            <FilterButton key={filter} filter={filter} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={filteredBookings}
          renderItem={({ item }) => <BookingCard booking={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={<EmptyState />}
        />
      </View>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.WHITE,
    opacity: 0.9,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.BLACK,
  },
  clearButton: {
    padding: 5,
  },
  filterContainer: {
    maxHeight: 50,
  },
  filterContent: {
    paddingRight: 20,
  },
  filterButton: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeFilterButton: {
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  filterText: {
    color: COLORS.BLACK,
    fontWeight: '600',
  },
  activeFilterText: {
    color: COLORS.WHITE,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingVertical: 10,
  },
  bookingCard: {
    marginBottom: 15,
    borderRadius: 20,
    elevation: 5,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  roomInfo: {
    flex: 1,
  },
  roomType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: 2,
  },
  roomNumber: {
    fontSize: 14,
    color: COLORS.LIGHT_BLUE,
    fontWeight: '600',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: COLORS.WHITE,
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateInfo: {
    marginLeft: 10,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  dateDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.ALICE_BLUE,
    marginHorizontal: 10,
  },
  bookingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: COLORS.ALICE_BLUE,
  },
  bookingDate: {
    fontSize: 12,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.LIGHT_BLUE,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
})