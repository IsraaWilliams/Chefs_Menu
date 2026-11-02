import React, { useState, useMemo } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, FlatList,
  StyleSheet, Alert, ScrollView, SafeAreaView,
  StatusBar, KeyboardAvoidingView, Platform
} from 'react-native';

// My main app - ST10501763 Israa Williams - MAST5112 Final 2026
export default function App() {
  // form inputs
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  // edit mode - added for part 3 requirement 1
  const [editingId, setEditingId] = useState(null);

  // search and filter - added for part 3 requirement 2
  const [searchName, setSearchName] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [menuItems, setMenuItems] = useState([
    {
      id: '1',
      name: 'Crispy Calamari',
      description: 'Lightly fried calamari rings served with lemon aioli, tartar sauce and fresh herbs. Crispy golden brown.',
      course: 'Starter',
      price: '75.00',
      dateAdded: '2026-11-10'
    },
    {
      id: '2',
      name: 'Roasted Tomato Basil Soup',
      description: 'Creamy roasted tomato soup infused with fresh basil, garlic and cream, served with artisan croutons.',
      course: 'Starter',
      price: '55.00',
      dateAdded: '2026-11-10'
    },
    {
      id: '3',
      name: 'Beef Tenderloin Steak',
      description: 'Premium 250g grilled beef tenderloin cooked to perfection, served with garlic mashed potatoes and seasonal vegetables.',
      course: 'Main Course',
      price: '195.00',
      dateAdded: '2026-11-11'
    },
    {
      id: '4',
      name: 'Grilled Atlantic Salmon',
      description: 'Fresh Atlantic salmon fillet grilled with lemon butter sauce, asparagus and wild rice pilaf.',
      course: 'Main Course',
      price: '165.00',
      dateAdded: '2026-11-11'
    },
    {
      id: '5',
      name: 'Traditional Malva Pudding',
      description: 'Authentic warm South African malva pudding with apricot jam, served with vanilla custard and ice cream.',
      course: 'Dessert',
      price: '65.00',
      dateAdded: '2026-11-12'
    },
  ]);

  const [errors, setErrors] = useState({});
  const courses = ['Starter', 'Main Course', 'Dessert'];
  const filterOptions = ['All', 'Starter', 'Main Course', 'Dessert'];

  // reusable function - part 3 requirement 4
  function formatPrice(value) {
    return `R ${Number(value).toFixed(2)}`;
  }

  // reusable function to get course count - requirement 4
  function getCourseCount(courseName) {
    return menuItems.filter(item => item.course === courseName).length;
  }

  // validation
  const validateInputs = () => {
    let newErrors = {};
    let isValid = true;

    if (!dishName.trim()) {
      newErrors.dishName = 'Dish name is required - cannot be empty';
      isValid = false;
    } else if (dishName.trim().length < 3) {
      newErrors.dishName = 'Dish name must be at least 3 characters';
      isValid = false;
    } else if (dishName.trim().length > 30) {
      newErrors.dishName = 'Dish name too long (max 30 chars)';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (description.trim().length < 10) {
      newErrors.description = 'Description too short (min 10 characters)';
      isValid = false;
    }

    if (!course) {
      newErrors.course = 'Please select a course type';
      isValid = false;
    }

    if (!price.trim()) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(price)) {
      newErrors.price = 'Price must be a number';
      isValid = false;
    } else if (Number(price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
      isValid = false;
    } else if (Number(price) > 1000) {
      newErrors.price = 'Price cannot exceed R 1000';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // add or update
  const addDish = () => {
    if (!validateInputs()) {
      Alert.alert('Validation Error', 'Please fix the errors before adding');
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    if (editingId) {
      // update existing - requirement 1 update
      const updatedList = menuItems.map(item => {
        if (item.id === editingId) {
          return {
            ...item,
            name: dishName.trim(),
            description: description.trim(),
            course: course,
            price: Number(price).toFixed(2),
            dateAdded: currentDate
          };
        }
        return item;
      });
      setMenuItems(updatedList);
      Alert.alert('Updated', `${dishName} has been updated`);
      setEditingId(null);
    } else {
      // add new
      const newDish = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        name: dishName.trim(),
        description: description.trim(),
        course: course,
        price: Number(price).toFixed(2),
        dateAdded: currentDate,
      };
      setMenuItems([...menuItems, newDish]);
      Alert.alert('Success', `${newDish.name} has been added\nPrice: ${formatPrice(newDish.price)}`);
    }

    clearForm();
  };

  const clearForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');
    setErrors({});
    setEditingId(null);
  };

  // edit function - requirement 1 edit
  const editDish = (item) => {
    setDishName(item.name);
    setDescription(item.description);
    setCourse(item.course);
    setPrice(item.price.toString());
    setEditingId(item.id);
  };

  const removeDish = (id, name) => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to remove "${name}" from the menu?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setMenuItems(menuItems.filter(item => item.id !== id));
            if (editingId === id) {
              clearForm();
            }
          }
        }
      ]
    );
  };

  // clear search and filter - requirement 2 clear
  const clearFilters = () => {
    setSearchName('');
    setSelectedFilter('All');
  };

  // stats - requirement 3
  const calculateStats = useMemo(() => {
    const totalValue = menuItems.reduce((sum, item) => sum + Number(item.price), 0);
    const averagePrice = menuItems.length > 0 ? totalValue / menuItems.length : 0;
    const starters = getCourseCount('Starter');
    const mains = getCourseCount('Main Course');
    const desserts = getCourseCount('Dessert');

    return {
      totalValue: totalValue.toFixed(2),
      averagePrice: averagePrice.toFixed(2),
      totalCount: menuItems.length,
      starters,
      mains,
      desserts
    };
  }, [menuItems]);

  // search + filter combined - requirement 2
  const filteredItems = useMemo(() => {
    let result = menuItems;

    if (searchName.trim() !== '') {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedFilter !== 'All') {
      result = result.filter(item => item.course === selectedFilter);
    }

    return result;
  }, [menuItems, selectedFilter, searchName]);

  // reusable component - requirement 4
  const renderCourseButton = (c) => (
    <TouchableOpacity
      key={c}
      style={[styles.courseBtn, course === c && styles.courseBtnActive]}
      onPress={() => { setCourse(c); if(errors.course) setErrors({...errors, course: null}); }}
      activeOpacity={0.7}
    >
      <Text style={[styles.courseText, course === c && styles.courseTextActive]}>{c}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A1A" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

          <View style={styles.header}>
            <Text style={styles.headerTitle}>CHEF'S MENU</Text>
            <Text style={styles.headerSubtitle}>Christoffel's Restaurant - Menu Manager</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{calculateStats.totalCount}</Text>
                <Text style={styles.statLabel}>Dishes</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R {calculateStats.totalValue}</Text>
                <Text style={styles.statLabel}>Total Value</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>R {calculateStats.averagePrice}</Text>
                <Text style={styles.statLabel}>Avg Price</Text>
              </View>
            </View>
            <View style={styles.courseStats}>
              <Text style={styles.courseStatText}>{calculateStats.starters} Starters - {calculateStats.mains} Mains - {calculateStats.desserts} Desserts</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <View style={styles.formHeader}>
              <Text style={styles.formTitle}>{editingId ? 'Edit Dish' : 'Add New Dish to Menu'}</Text>
              <Text style={styles.formSubTitle}>All fields marked with * are required</Text>
            </View>

            <Text style={styles.label}>DISH NAME *</Text>
            <TextInput
              style={[styles.input, errors.dishName && styles.inputError]}
              placeholder="e.g. Grilled Lamb Chops with Rosemary"
              placeholderTextColor="#999"
              value={dishName}
              onChangeText={(text) => { setDishName(text); if(errors.dishName) setErrors({...errors, dishName: null}); }}
              maxLength={30}
            />
            {errors.dishName && <Text style={styles.errorText}>{errors.dishName}</Text>}

            <Text style={styles.label}>DETAILED DESCRIPTION *</Text>
            <TextInput
              style={[styles.input, styles.textArea, errors.description && styles.inputError]}
              placeholder="Describe ingredients, cooking method, portion size..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={(text) => { setDescription(text); if(errors.description) setErrors({...errors, description: null}); }}
              maxLength={150}
            />
            <Text style={styles.charCount}>{description.length}/150 characters</Text>
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}

            <Text style={styles.label}>COURSE TYPE *</Text>
            <View style={styles.courseContainer}>
              {courses.map(renderCourseButton)}
            </View>
            {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}

            <Text style={styles.label}>PRICE IN ZAR (R) *</Text>
            <TextInput
              style={[styles.input, errors.price && styles.inputError]}
              placeholder="e.g. 129.99"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
              value={price}
              onChangeText={(text) => { setPrice(text); if(errors.price) setErrors({...errors, price: null}); }}
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.clearButton} onPress={clearForm}>
                <Text style={styles.clearButtonText}>CLEAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addButton} onPress={addDish}>
                <Text style={styles.addButtonText}>{editingId ? 'UPDATE DISH' : '+ ADD TO MENU'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Search and Filter:</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search by dish name..."
              placeholderTextColor="#999"
              value={searchName}
              onChangeText={setSearchName}
            />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.filterRow}>
                {filterOptions.map((filter) => (
                  <TouchableOpacity
                    key={filter}
                    style={[styles.filterBtn, selectedFilter === filter && styles.filterBtnActive]}
                    onPress={() => setSelectedFilter(filter)}
                  >
                    <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.clearFilterBtn} onPress={clearFilters}>
                  <Text style={styles.clearFilterText}>Clear</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Text style={styles.resultCount}>{filteredItems.length} items found</Text>
          </View>

          <View style={styles.menuSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Current Menu ({filteredItems.length})</Text>
              <Text style={styles.sectionSubTitle}>{selectedFilter} view</Text>
            </View>

            {filteredItems.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyIcon}>🍽️</Text>
                <Text style={styles.emptyText}>No {selectedFilter} dishes found</Text>
                <Text style={styles.emptySubtext}>Try changing filter or add new dishes above</Text>
              </View>
            ) : (
              <FlatList
                data={filteredItems}
                scrollEnabled={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                  <View style={styles.dishCard}>
                    <View style={styles.cardTop}>
                      <Text style={styles.dishNumber}>#{index + 1}</Text>
                      <Text style={styles.dishDate}>{item.dateAdded}</Text>
                    </View>
                    <View style={styles.dishHeader}>
                      <Text style={styles.dishName}>{item.name}</Text>
                      <Text style={styles.dishPrice}>{formatPrice(item.price)}</Text>
                    </View>
                    <View style={styles.courseBadge}>
                      <Text style={styles.courseBadgeText}>{item.course.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.dishDesc}>{item.description}</Text>
                    <View style={styles.cardFooter}>
                      <Text style={styles.footerInfo}>ID: {item.id.slice(0, 8)}</Text>
                      <View style={{ flexDirection: 'row', gap: 8 }}>
                        <TouchableOpacity onPress={() => editDish(item)} style={styles.editBtn}>
                          <Text style={styles.editText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeDish(item.id, item.name)} style={styles.removeBtn}>
                          <Text style={styles.removeText}>Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Christoffel's Restaurant - MAST5112 Final - 2026</Text>
            <Text style={styles.footerSubText}>ST10501763 Israa Williams</Text>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8F0' },
  header: { backgroundColor: '#1A1A1A', padding: 25, paddingTop: 50, alignItems: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { color: '#FF6B35', fontSize: 28, fontWeight: '900', letterSpacing: 2 },
  headerSubtitle: { color: '#BBB', fontSize: 11, marginTop: 6, letterSpacing: 1, fontWeight: '600' },
  statsRow: { flexDirection: 'row', marginTop: 20, gap: 12 },
  statBox: { backgroundColor: '#2A2A2A', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, alignItems: 'center', minWidth: 90, borderWidth: 1, borderColor: '#333' },
  statNumber: { color: '#FF6B35', fontSize: 14, fontWeight: '900' },
  statLabel: { color: '#999', fontSize: 9, marginTop: 3, fontWeight: '700', letterSpacing: 0.5 },
  courseStats: { backgroundColor: '#FF6B35', marginTop: 16, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 20 },
  courseStatText: { color: '#FFF', fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  formCard: { backgroundColor: '#FFF', margin: 16, padding: 20, borderRadius: 16, elevation: 4 },
  formHeader: { borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 12, marginBottom: 8 },
  formTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A1A' },
  formSubTitle: { fontSize: 11, color: '#888', marginTop: 4 },
  label: { fontSize: 10, fontWeight: '800', color: '#555', marginTop: 16, marginBottom: 6, letterSpacing: 1 },
  input: { borderWidth: 1.5, borderColor: '#E8E8E8', borderRadius: 12, padding: 14, backgroundColor: '#FAFAFA', fontSize: 14, color: '#1A1A1A', fontWeight: '500' },
  textArea: { height: 90, textAlignVertical: 'top' },
  charCount: { fontSize: 10, color: '#AAA', textAlign: 'right', marginTop: 4 },
  inputError: { borderColor: '#FF4444', backgroundColor: '#FFF5F5' },
  errorText: { color: '#FF4444', fontSize: 11, marginTop: 5, fontWeight: '600' },
  courseContainer: { flexDirection: 'row', gap: 8 },
  courseBtn: { flex: 1, borderWidth: 1.5, borderColor: '#E8E8E8', padding: 14, borderRadius: 12, alignItems: 'center', backgroundColor: '#FAFAFA' },
  courseBtnActive: { backgroundColor: '#1A1A1A', borderColor: '#1A1A1A' },
  courseText: { fontSize: 11, fontWeight: '700', color: '#666' },
  courseTextActive: { color: '#FFF' },
  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 24 },
  clearButton: { flex: 1, borderWidth: 1.5, borderColor: '#DDD', padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#FFF' },
  clearButtonText: { color: '#666', fontWeight: '800', fontSize: 12, letterSpacing: 1 },
  addButton: { flex: 2, backgroundColor: '#FF6B35', padding: 16, borderRadius: 12, alignItems: 'center', elevation: 2 },
  addButtonText: { color: '#FFF', fontWeight: '900', fontSize: 13, letterSpacing: 1 },
  filterSection: { marginHorizontal: 16, marginTop: 4 },
  filterLabel: { fontSize: 11, fontWeight: '800', color: '#666', marginBottom: 8 },
  searchInput: { borderWidth: 1.5, borderColor: '#E8E8E8', borderRadius: 12, padding: 12, backgroundColor: '#FFF', fontSize: 13, marginBottom: 10 },
  filterRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  filterBtn: { borderWidth: 1.5, borderColor: '#E8E8E8', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFF' },
  filterBtnActive: { backgroundColor: '#1A1A1A', borderColor: '#1A1A1A' },
  filterText: { fontSize: 11, fontWeight: '700', color: '#666' },
  filterTextActive: { color: '#FFF' },
  clearFilterBtn: { backgroundColor: '#999', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  clearFilterText: { color: '#FFF', fontSize: 11, fontWeight: '700' },
  resultCount: { fontSize: 11, color: '#888', marginTop: 8 },
  menuSection: { marginHorizontal: 16, marginTop: 18 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '800', color: '#1A1A1A' },
  sectionSubTitle: { fontSize: 11, color: '#888', fontWeight: '600' },
  emptyState: { backgroundColor: '#FFF', padding: 35, borderRadius: 16, alignItems: 'center', borderWidth: 1.5, borderColor: '#EEE', borderStyle: 'dashed' },
  emptyIcon: { fontSize: 36, marginBottom: 12 },
  emptyText: { fontSize: 14, fontWeight: '700', color: '#333' },
  emptySubtext: { fontSize: 12, color: '#888', marginTop: 6, textAlign: 'center' },
  dishCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 14, marginBottom: 12, borderLeftWidth: 5, borderLeftColor: '#FF6B35', elevation: 3 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  dishNumber: { fontSize: 10, fontWeight: '900', color: '#FF6B35', backgroundColor: '#FFF0EB', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  dishDate: { fontSize: 10, color: '#AAA', fontWeight: '600' },
  dishHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  dishName: { fontSize: 15, fontWeight: '800', color: '#1A1A1A', flex: 1, marginRight: 10, lineHeight: 20 },
  dishPrice: { fontSize: 16, fontWeight: '900', color: '#FF6B35' },
  courseBadge: { backgroundColor: '#FFF0EB', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginTop: 8, borderWidth: 1, borderColor: '#FFE0D0' },
  courseBadgeText: { fontSize: 9, fontWeight: '900', color: '#FF6B35', letterSpacing: 0.5 },
  dishDesc: { fontSize: 13, color: '#666', marginTop: 10, lineHeight: 19 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, borderTopWidth: 1, borderTopColor: '#F5F5F5', paddingTop: 10 },
  footerInfo: { fontSize: 9, color: '#BBB', fontWeight: '600' },
  editBtn: { backgroundColor: '#FFF5E0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#FFDDAA', marginRight: 6 },
  editText: { fontSize: 11, color: '#FF8C00', fontWeight: '700' },
  removeBtn: { backgroundColor: '#FFF0F0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#FFD0D0' },
  removeText: { fontSize: 11, color: '#FF4444', fontWeight: '700' },
  footer: { alignItems: 'center', padding: 25, marginTop: 10 },
  footerText: { fontSize: 11, fontWeight: '700', color: '#999' },
  footerSubText: { fontSize: 10, color: '#BBB', marginTop: 4 },
});
