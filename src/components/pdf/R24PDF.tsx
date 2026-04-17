import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { GRUPOS_SMAE } from '.././../constants/smae';

const styles = StyleSheet.create({
  page: { 
    padding: 30, 
    backgroundColor: '#FFFFFF', 
    fontFamily: 'Helvetica' 
  },
  header: { 
    borderBottomWidth: 2, 
    borderBottomColor: '#4a9a75', 
    borderBottomStyle: 'solid',
    marginBottom: 15, 
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#4a9a75' 
  },
  patientInfo: { 
    marginBottom: 15, 
    padding: 10, 
    backgroundColor: '#f2f9f6',
    borderRadius: 8 
  },
  mealSection: { 
    marginBottom: 10, 
    padding: 8, 
    borderWidth: 1, 
    borderColor: '#e5e7eb', 
    borderStyle: 'solid',
    borderRadius: 10 
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4a9a75',
    padding: 4,
    borderRadius: 4,
    marginBottom: 8
  },
  mealTitle: { 
    fontSize: 9, 
    fontWeight: 'bold', 
    color: '#FFFFFF', 
    textTransform: 'uppercase' 
  },
  mealKcal: { 
    fontSize: 9, 
    fontWeight: 'bold', 
    color: '#FFFFFF' 
  },
  grid: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  gridItem: { 
    width: '48%', 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginBottom: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.5,
    borderBottomColor: '#f3f4f6',
    borderBottomStyle: 'solid',
    marginRight: '2%'
  },
  label: { 
    fontSize: 7, 
    color: '#6b7280', 
    textTransform: 'uppercase' 
  },
  value: { 
    fontSize: 7, 
    fontWeight: 'bold', 
    color: '#374151' 
  },
  totalBox: { 
    marginTop: 15, 
    padding: 15, 
    backgroundColor: '#4a9a75', 
    borderRadius: 12, 
    color: 'white' 
  }
});

export const R24PDF = ({ data, totals, grandTotal, patientName }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Nutri-AS | Reporte Detallado R24</Text>
        <Text style={{ fontSize: 8, color: '#9ca3af' }}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.patientInfo}>
        <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#374151' }}>
          Paciente: {patientName}
        </Text>
      </View>

      {Object.entries(totals).map(([meal, values]: any) => (
        <View key={meal} style={styles.mealSection}>
          <View style={styles.mealHeader}>
            <Text style={styles.mealTitle}>{meal}</Text>
            <Text style={styles.mealKcal}>{Math.round(values.kcal)} kcal</Text>
          </View>
          
          <View style={styles.grid}>
            {Object.entries(GRUPOS_SMAE).map(([key, info]: [string, any]) => {
              const qty = data[meal]?.[key] || 0;
              return (
                <View key={key} style={styles.gridItem}>
                  <Text style={styles.label}>{info.label}</Text>
                  <Text style={[styles.value, { color: qty > 0 ? '#4a9a75' : '#d1d5db' }]}>
                    {qty} eq.
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}

      <View style={styles.totalBox}>
        <Text style={{ fontSize: 8, fontWeight: 'bold', marginBottom: 4, opacity: 0.8 }}>
          TOTAL DIARIO ACUMULADO
        </Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
          {Math.round(grandTotal.kcal)} kcal
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          marginTop: 8, 
          gap: 15, 
          borderTopWidth: 0.5, 
          borderTopColor: 'rgba(255,255,255,0.3)', 
          paddingTop: 8 // <-- Cambiado de pt a paddingTop
        }}>
          <Text style={{ fontSize: 9 }}>P: {grandTotal.pro.toFixed(1)}g</Text>
          <Text style={{ fontSize: 9 }}>L: {grandTotal.lip.toFixed(1)}g</Text>
          <Text style={{ fontSize: 9 }}>H: {grandTotal.hco.toFixed(1)}g</Text>
        </View>
      </View>
    </Page>
  </Document>
);