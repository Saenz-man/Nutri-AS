// src/components/pdf/PlanAlimenticioPDF.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { GRUPOS_SMAE } from '@/constants/smae';

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', padding: 40, fontFamily: 'Helvetica' },
  
  // --- HEADER DISEÑO CAPTURA ---
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 15,
    borderBottom: '2pt solid #10b981'
  },
  logoText: { fontSize: 24, fontWeight: 'heavy', color: '#10b981', letterSpacing: 1 },
  headerRight: { alignItems: 'flex-end' },
  subtitle: { fontSize: 9, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 2 },
  nutriName: { fontSize: 13, fontWeight: 'bold', color: '#1f2937' },
  nutriInfo: { fontSize: 8, color: '#6b7280', marginTop: 2 },

  // --- SECCIONES Y TÍTULOS ---
  sectionTitle: { 
    fontSize: 11, 
    fontWeight: 'heavy', 
    color: '#10b981', 
    textTransform: 'uppercase', 
    marginTop: 20, 
    marginBottom: 8 
  },
  
  // --- CARD CONTEXTO PACIENTE ---
  patientCard: { 
    backgroundColor: '#f9fafb', 
    padding: 15, 
    borderRadius: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    border: '0.5pt solid #f3f4f6'
  },
  patientItem: { flexDirection: 'column' },
  label: { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 3 },
  value: { fontSize: 11, fontWeight: 'bold', color: '#1f2937' },

  // --- TABLA REQUERIMIENTO (EL DISEÑO GENIAL) ---
  requirementCard: { 
    backgroundColor: '#f6fcf9', 
    borderRadius: 15, 
    padding: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 30 
  },
  calorieCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calorieNumber: { fontSize: 18, fontWeight: 'heavy', color: '#10b981' },
  
  reqTable: { flex: 1 },
  reqHeaderRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#e5e7eb', 
    paddingBottom: 5, 
    marginBottom: 8 
  },
  reqHeaderText: { fontSize: 8, fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' },
  reqRow: { flexDirection: 'row', paddingVertical: 6 },
  reqLabel: { fontSize: 9, fontWeight: 'bold', width: '40%' },
  reqValue: { fontSize: 9, color: '#374151', width: '30%', textAlign: 'center' },
  reqGrams: { fontSize: 9, color: '#374151', width: '30%', textAlign: 'right' },

  // --- TABLA SMAE ---
  table: { width: '100%', borderRadius: 8, overflow: 'hidden', marginTop: 10, border: '0.5pt solid #e5e7eb' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 8, alignItems: 'center' },
  tableHeader: { backgroundColor: '#f9fafb' },
  tableCell: { fontSize: 9, color: '#374151', paddingHorizontal: 10 },
  
  // --- FOOTER ---
  footer: { 
    position: 'absolute', 
    bottom: 30, 
    left: 40, 
    right: 40, 
    borderTop: '0.5pt solid #e5e7eb', 
    paddingTop: 10,
    alignItems: 'center' 
  },
  footerText: { fontSize: 7, color: '#9ca3af', textAlign: 'center', lineHeight: 1.5 }
});

export default function PlanAlimenticioPDF({ data }: { data: any }) {
  const { paciente, biometricos, metas, distribucionSMAE, nutricionista } = data;
  const fechaHoy = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* 🏥 HEADER SEGÚN CAPTURA */}
        <View style={styles.header}>
          <Text style={styles.logoText}>NUTRI-AS</Text>
          <View style={styles.headerRight}>
            <Text style={styles.subtitle}>Nutrición Clínica Profesional</Text>
            <Text style={styles.nutriName}>{nutricionista.nombre} {nutricionista.apellido}</Text>
            <Text style={styles.nutriInfo}>Cédula: {nutricionista.cedula || '---'} | Tel: {nutricionista.telefono}</Text>
          </View>
        </View>

        {/* 👤 CONTEXTO DEL PACIENTE */}
        <Text style={styles.sectionTitle}>Contexto del Paciente</Text>
        <View style={styles.patientCard}>
          <View style={styles.patientItem}>
            <Text style={styles.label}>Paciente</Text>
            <Text style={styles.value}>{paciente.nombre} {paciente.apellido}</Text>
          </View>
          <View style={styles.patientItem}>
            <Text style={styles.label}>Edad / Sexo</Text>
            <Text style={styles.value}>{biometricos.edad} Años | {biometricos.genero?.toUpperCase()}</Text>
          </View>
          <View style={styles.patientItem}>
            <Text style={styles.label}>Peso / Talla</Text>
            <Text style={styles.value}>{biometricos.peso} kg | {biometricos.talla} cm</Text>
          </View>
          <View style={styles.patientItem}>
            <Text style={styles.label}>IMC Actual</Text>
            <Text style={styles.value}>{biometricos.imc}</Text>
          </View>
        </View>

        {/* 📊 REQUERIMIENTO Y DISTRIBUCIÓN (DISEÑO EXACTO) */}
        <Text style={styles.sectionTitle}>Requerimiento y Distribución</Text>
        <View style={styles.requirementCard}>
          {/* Círculo de Calorías */}
          <View style={styles.calorieCircle}>
            <Text style={styles.calorieNumber}>{metas.kcal.toFixed(0)}</Text>
          </View>

          {/* Tabla de Macros */}
          <View style={styles.reqTable}>
            <View style={styles.reqHeaderRow}>
              <Text style={[styles.reqHeaderText, { width: '40%' }]}>Macro</Text>
              <Text style={[styles.reqHeaderText, { width: '30%', textAlign: 'center' }]}>%</Text>
              <Text style={[styles.reqHeaderText, { width: '30%', textAlign: 'right' }]}>Gramos</Text>
            </View>

            <View style={styles.reqRow}>
              <Text style={[styles.reqLabel, { color: '#f87171' }]}>Carbohidratos</Text>
              <Text style={styles.reqValue}>{metas.macros.hco}%</Text>
              <Text style={styles.reqGrams}>{metas.metasGramos.hcoG.toFixed(0)} g</Text>
            </View>

            <View style={styles.reqRow}>
              <Text style={[styles.reqLabel, { color: '#9ca3af' }]}>Proteínas</Text>
              <Text style={styles.reqValue}>{metas.macros.pro}%</Text>
              <Text style={styles.reqGrams}>{metas.metasGramos.proG.toFixed(0)} g</Text>
            </View>

            <View style={styles.reqRow}>
              <Text style={[styles.reqLabel, { color: '#fbbf24' }]}>Lípidos</Text>
              <Text style={styles.reqValue}>{metas.macros.lip}%</Text>
              <Text style={styles.reqGrams}>{metas.metasGramos.lipG.toFixed(0)} g</Text>
            </View>
          </View>
        </View>

        {/* 📋 DISTRIBUCIÓN SMAE */}
        <Text style={styles.sectionTitle}>Distribución de Raciones Diarias</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, { width: '40%', fontWeight: 'bold' }]}>Grupo de Alimento</Text>
            <Text style={[styles.tableCell, { width: '20%', textAlign: 'center', fontWeight: 'bold' }]}>Raciones</Text>
            <Text style={[styles.tableCell, { width: '40%', fontWeight: 'bold' }]}>Nota</Text>
          </View>
          
          {Object.entries(distribucionSMAE).map(([key, cant]: any) => {
            if (cant === 0) return null;
            const info = GRUPOS_SMAE[key];
            return (
              <View key={key} style={styles.tableRow}>
                <Text style={[styles.tableCell, { width: '40%' }]}>{info.label}</Text>
                <Text style={[styles.tableCell, { width: '20%', textAlign: 'center' }]}>{cant}</Text>
                <Text style={[styles.tableCell, { width: '40%', color: '#9ca3af', fontSize: 8 }]}>Consumir según ración indicada</Text>
              </View>
            );
          })}
        </View>

        {/* 🦶 FOOTER ACTUALIZADO */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Plan nutricional personalizado generado por NUTRI-AS el {fechaHoy}.
          </Text>
          <Text style={styles.footerText}>
            Este documento es una guía informativa. Para cambios en su tratamiento, consulte a su nutriólogo clínico.
          </Text>
        </View>

      </Page>
    </Document>
  );
}