// src/components/pdf/MedicionesPDF.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', padding: 40, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingBottom: 15, borderBottom: '2pt solid #10b981' },
  logoText: { fontSize: 24, fontWeight: 'heavy', color: '#10b981' },
  headerRight: { alignItems: 'flex-end' },
  nutriName: { fontSize: 13, fontWeight: 'bold', color: '#1f2937' },
  nutriInfo: { fontSize: 8, color: '#6b7280', marginTop: 2 },

  sectionTitle: { fontSize: 11, fontWeight: 'heavy', color: '#10b981', textTransform: 'uppercase', marginTop: 20, marginBottom: 8 },
  
  // Card Paciente
  patientCard: { backgroundColor: '#f9fafb', padding: 15, borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', border: '0.5pt solid #f3f4f6' },
  label: { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 3 },
  value: { fontSize: 11, fontWeight: 'bold', color: '#1f2937' },

  // Grid de Mediciones
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  gridItem: { width: '31%', backgroundColor: '#ffffff', padding: 10, borderRadius: 8, border: '0.5pt solid #e5e7eb' },
  gridLabel: { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase' },
  gridValue: { fontSize: 12, fontWeight: 'bold', color: '#1f2937', marginTop: 2 },

  // Tabla Composición
  table: { width: '100%', borderRadius: 8, overflow: 'hidden', marginTop: 10, border: '0.5pt solid #e5e7eb' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 8 },
  tableHeader: { backgroundColor: '#f9fafb' },
  tableCell: { fontSize: 9, color: '#374151', paddingHorizontal: 10 },
  
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTop: '0.5pt solid #e5e7eb', paddingTop: 10, textAlign: 'center' },
  footerText: { fontSize: 7, color: '#9ca3af' }
});

export default function MedicionesPDF({ data }: { data: any }) {
  const { paciente, biometricos, mediciones, nutricionista } = data;
  const fecha = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.logoText}>NUTRI-AS</Text>
          <View style={styles.headerRight}>
            <Text style={{ fontSize: 9, color: '#9ca3af' }}>EVALUACIÓN ANTROPOMÉTRICA</Text>
            <Text style={styles.nutriName}>{nutricionista.nombre} {nutricionista.apellido}</Text>
            <Text style={styles.nutriInfo}>Cédula: {nutricionista.cedula} | Tel: {nutricionista.telefono}</Text>
          </View>
        </View>

        {/* Info Paciente */}
        <View style={styles.patientCard}>
          <View><Text style={styles.label}>Paciente</Text><Text style={styles.value}>{paciente.nombre} {paciente.apellido}</Text></View>
          <View><Text style={styles.label}>Peso Actual</Text><Text style={styles.value}>{mediciones.peso} kg</Text></View>
          <View><Text style={styles.label}>Talla</Text><Text style={styles.value}>{mediciones.talla} cm</Text></View>
          <View><Text style={styles.label}>IMC</Text><Text style={[styles.value, { color: '#10b981' }]}>{biometricos.imc}</Text></View>
        </View>

        {/* Composición Corporal (Bioimpedancia) */}
        <Text style={styles.sectionTitle}>Composición Corporal</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>% Grasa</Text>
            <Text style={[styles.gridValue, { color: '#f87171' }]}>{mediciones.grasaEquipo}%</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>% Músculo</Text>
            <Text style={[styles.gridValue, { color: '#10b981' }]}>{mediciones.musculo}%</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>% Agua</Text>
            <Text style={[styles.gridValue, { color: '#3b82f6' }]}>{mediciones.agua}%</Text>
          </View>
        </View>

        {/* Panículos (ISAK) */}
        <Text style={styles.sectionTitle}>Panículos Cutáneos (mm)</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '25%', fontWeight: 'bold' }]}>Tríceps</Text>
            <Text style={[styles.tableCell, { width: '25%', fontWeight: 'bold' }]}>Bíceps</Text>
            <Text style={[styles.tableCell, { width: '25%', fontWeight: 'bold' }]}>Subesc.</Text>
            <Text style={[styles.tableCell, { width: '25%', fontWeight: 'bold' }]}>Abdominal</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '25%' }]}>{mediciones.triceps || '0'}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{mediciones.biceps || '0'}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{mediciones.subescapular || '0'}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{mediciones.abdominal || '0'}</Text>
          </View>
        </View>

        {/* Circunferencias */}
        <Text style={styles.sectionTitle}>Circunferencias (cm)</Text>
        <View style={styles.gridContainer}>
          <View style={styles.gridItem}><Text style={styles.gridLabel}>Cintura</Text><Text style={styles.gridValue}>{mediciones.cintura} cm</Text></View>
          <View style={styles.gridItem}><Text style={styles.gridLabel}>Cadera</Text><Text style={styles.gridValue}>{mediciones.cadera} cm</Text></View>
          <View style={styles.gridItem}><Text style={styles.gridLabel}>ICC</Text><Text style={styles.gridValue}>{biometricos.icc}</Text></View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Reporte biométrico generado el {fecha}. NUTRI-AS ®</Text>
        </View>
      </Page>
    </Document>
  );
}