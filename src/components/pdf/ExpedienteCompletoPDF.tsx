// src/components/pdf/ExpedienteCompletoPDF.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', padding: 40, fontFamily: 'Helvetica' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    borderBottom: '2pt solid #10b981', 
    paddingBottom: 15, 
    marginBottom: 20 
  },
  logoGroup: { flexDirection: 'column' },
  logoText: { fontSize: 24, fontWeight: 'heavy', color: '#10b981' },
  logoSub: { fontSize: 9, fontWeight: 'bold', color: '#10b981', marginTop: -2 },
  nutriInfo: { alignItems: 'flex-end' },
  nutriName: { fontSize: 13, fontWeight: 'bold', color: '#1f2937' },
  nutriContact: { fontSize: 8, color: '#6b7280', marginTop: 2 },
  
  sectionTitle: { fontSize: 11, fontWeight: 'heavy', color: '#10b981', textTransform: 'uppercase', marginTop: 15, marginBottom: 8 },
  
  card: { backgroundColor: '#f9fafb', padding: 12, borderRadius: 10, border: '0.5pt solid #f3f4f6', flexDirection: 'row', justifyContent: 'space-between' },
  label: { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase' },
  value: { fontSize: 10, fontWeight: 'bold', color: '#1f2937', marginTop: 2 },

  // --- DISEÑO REQUERIMIENTO (Círculo + Macros) ---
  requirementCard: { 
    backgroundColor: '#f6fdf9', borderRadius: 15, padding: 15, flexDirection: 'row', 
    alignItems: 'center', gap: 20, marginBottom: 15 
  },
  calorieCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  calorieNumber: { fontSize: 16, fontWeight: 'heavy', color: '#10b981' },

  table: { width: '100%', border: '0.5pt solid #e5e7eb', borderRadius: 6, overflow: 'hidden', marginTop: 5 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 6 },
  tableHeader: { backgroundColor: '#f9fafb' },
  cell: { fontSize: 8, color: '#374151', paddingHorizontal: 8 },
  
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTop: '0.5pt solid #e5e7eb', paddingTop: 10, textAlign: 'center' },
  footerText: { fontSize: 7, color: '#9ca3af' }
});

export default function ExpedienteCompletoPDF({ paciente, nutricionista }: any) {
  // Tomamos la cita más reciente que tenga datos para el resumen
  const ultimaCita = paciente.appointments?.find((a: any) => a.medicion || a.laboratorios) || {};
  const fechaReporte = new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 🏥 HEADER DINÁMICO */}
        <View style={styles.header}>
          <View style={styles.logoGroup}>
            <Text style={styles.logoText}>NUTRI-AS</Text>
            <Text style={styles.logoSub}>NUTRICIÓN CLÍNICA PROFESIONAL</Text>
          </View>
          <View style={styles.nutriInfo}>
            <Text style={styles.nutriName}>{nutricionista.nombre} {nutricionista.apellido}</Text>
            <Text style={styles.nutriContact}>Cédula: {nutricionista.cedula || '---'} | Tel: {nutricionista.telefono}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Datos del Paciente</Text>
        <View style={styles.card}>
          <View><Text style={styles.label}>Paciente</Text><Text style={styles.value}>{paciente.nombre} {paciente.apellido}</Text></View>
          <View><Text style={styles.label}>Edad / Sexo</Text><Text style={styles.value}>{paciente.edad || '--'} Años | {paciente.genero?.toUpperCase() || '--'}</Text></View>
          <View><Text style={styles.label}>ID Expediente</Text><Text style={styles.value}>{paciente.expediente}</Text></View>
          <View><Text style={styles.label}>Emisión</Text><Text style={styles.value}>{fechaReporte}</Text></View>
        </View>

        {/* 📊 SECCIÓN: REQUERIMIENTO (DINÁMICO) */}
        {ultimaCita.plan && (
            <>
            <Text style={styles.sectionTitle}>Requerimiento y Distribución Actual</Text>
            <View style={styles.requirementCard}>
                <View style={styles.calorieCircle}>
                    <Text style={styles.calorieNumber}>{ultimaCita.plan.kcal || '0'}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View><Text style={styles.label}>HCO</Text><Text style={styles.value}>{ultimaCita.plan.macros?.hco || '0'}%</Text></View>
                    <View><Text style={styles.label}>PROT</Text><Text style={styles.value}>{ultimaCita.plan.macros?.pro || '0'}%</Text></View>
                    <View><Text style={styles.label}>LIP</Text><Text style={styles.value}>{ultimaCita.plan.macros?.lip || '0'}%</Text></View>
                </View>
            </View>
            </>
        )}

        {/* 📏 SECCIÓN: ANTROPOMETRÍA */}
        <Text style={styles.sectionTitle}>Última Evaluación Antropométrica</Text>
        {ultimaCita.medicion ? (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.cell, { width: '25%', fontWeight: 'bold' }]}>Peso (kg)</Text>
              <Text style={[styles.cell, { width: '25%', fontWeight: 'bold' }]}>IMC</Text>
              <Text style={[styles.cell, { width: '25%', fontWeight: 'bold' }]}>% Grasa</Text>
              <Text style={[styles.cell, { width: '25%', fontWeight: 'bold' }]}>% Músculo</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { width: '25%' }]}>{ultimaCita.medicion.peso || 'N/A'}</Text>
              <Text style={[styles.cell, { width: '25%' }]}>{ultimaCita.medicion.imc || 'N/A'}</Text>
              <Text style={[styles.cell, { width: '25%' }]}>{ultimaCita.medicion.grasaEquipo || 'N/A'}%</Text>
              <Text style={[styles.cell, { width: '25%' }]}>{ultimaCita.medicion.musculo || 'N/A'}%</Text>
            </View>
          </View>
        ) : (
          <Text style={{ fontSize: 9, color: '#9ca3af', marginTop: 5, fontStyle: 'italic' }}>
            * No se registran mediciones en la base de datos.
          </Text>
        )}

        {/* 🧪 SECCIÓN: LABORATORIOS CONSOLIDADA */}
        <Text style={styles.sectionTitle}>Resumen de Laboratorios</Text>
        {ultimaCita.laboratorios ? (
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.cell, { width: '50%', fontWeight: 'bold' }]}>Biomarcador</Text>
              <Text style={[styles.cell, { width: '50%', fontWeight: 'bold', textAlign: 'right' }]}>Resultado</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { width: '50%' }]}>Glucosa en Ayuno</Text>
              <Text style={[styles.cell, { width: '50%', textAlign: 'right' }]}>{ultimaCita.laboratorios.glucosaAyuno || 'N/A'} mg/dL</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { width: '50%' }]}>Colesterol Total</Text>
              <Text style={[styles.cell, { width: '50%', textAlign: 'right' }]}>{ultimaCita.laboratorios.colesterolTotal || 'N/A'} mg/dL</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.cell, { width: '50%' }]}>Triglicéridos</Text>
              <Text style={[styles.cell, { width: '50%', textAlign: 'right' }]}>{ultimaCita.laboratorios.trigliceridos || 'N/A'} mg/dL</Text>
            </View>
          </View>
        ) : (
          <Text style={{ fontSize: 9, color: '#9ca3af', marginTop: 5, fontStyle: 'italic' }}>
            * No se registran estudios de laboratorio recientes.
          </Text>
        )}

        {/* 🦶 FOOTER DINÁMICO */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            PARA DARLE MEJOR PRESENTACIÓN - NUTRI-AS ® {new Date().getFullYear()}
          </Text>
          <Text style={styles.footerText}>
            Reporte generado por {nutricionista.nombre} {nutricionista.apellido}. Este documento es para fines clínicos.
          </Text>
        </View>
      </Page>
    </Document>
  );
}