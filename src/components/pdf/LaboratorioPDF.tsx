// src/components/pdf/LaboratorioPDF.tsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', padding: 40, fontFamily: 'Helvetica' },
  
  // --- HEADER DISEÑO SOLICITADO ---
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingBottom: 15,
    borderBottom: '2pt solid #10b981'
  },
  logoGroup: { flexDirection: 'column' },
  logoText: { fontSize: 22, fontWeight: 'heavy', color: '#10b981', letterSpacing: 0.5 },
  logoSub: { fontSize: 9, fontWeight: 'bold', color: '#10b981', marginTop: -2 },
  headerRight: { alignItems: 'flex-end' },
  nutriName: { fontSize: 13, fontWeight: 'bold', color: '#1f2937' },
  nutriInfo: { fontSize: 8, color: '#6b7280', marginTop: 2 },

  // --- SECCIONES ---
  sectionTitle: { fontSize: 11, fontWeight: 'heavy', color: '#10b981', textTransform: 'uppercase', marginTop: 18, marginBottom: 8 },
  
  // --- CARD CONTEXTO PACIENTE ---
  patientCard: { 
    backgroundColor: '#f9fafb', padding: 15, borderRadius: 12, flexDirection: 'row', 
    justifyContent: 'space-between', border: '0.5pt solid #f3f4f6', marginBottom: 10 
  },
  label: { fontSize: 7, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 3 },
  value: { fontSize: 11, fontWeight: 'bold', color: '#1f2937' },

  // --- TABLA REQUERIMIENTO (MACROS) ---
  requirementCard: { 
    backgroundColor: '#f6fdf9', borderRadius: 15, padding: 15, flexDirection: 'row', 
    alignItems: 'center', gap: 20, marginBottom: 15 
  },
  calorieCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  calorieNumber: { fontSize: 16, fontWeight: 'heavy', color: '#10b981' },

  // --- TABLAS DE LABORATORIO ---
  table: { width: '100%', borderRadius: 8, overflow: 'hidden', border: '0.5pt solid #e5e7eb', marginBottom: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#e5e7eb', paddingVertical: 6, alignItems: 'center' },
  tableHeader: { backgroundColor: '#f9fafb' },
  tableCell: { fontSize: 9, color: '#374151', paddingHorizontal: 10 },
  tableCellBold: { fontSize: 9, fontWeight: 'bold', color: '#1f2937', paddingHorizontal: 10 },

  // --- FOOTER ---
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, borderTop: '0.5pt solid #e5e7eb', paddingTop: 10, alignItems: 'center' },
  footerText: { fontSize: 7, color: '#9ca3af', textAlign: 'center' }
});

export default function LaboratorioPDF({ data }: { data: any }) {
  const { paciente, values, metas, nutricionista } = data;
  const fechaHoy = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  // Función para renderizar filas dinámicas con N/A
  const LabRow = ({ label, value, unit = "" }: any) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { width: '50%' }]}>{label}</Text>
      <Text style={[styles.tableCellBold, { width: '50%', textAlign: 'right', color: value ? '#111827' : '#d1d5db' }]}>
        {value ? `${value} ${unit}` : 'N/A'}
      </Text>
    </View>
  );

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* 🏥 HEADER SOLICITADO */}
        <View style={styles.header}>
          <View style={styles.logoGroup}>
            <Text style={styles.logoText}>NUTRI-AS</Text>
            <Text style={styles.logoSub}>NUTRICIÓN CLÍNICA PROFESIONAL</Text>
          </View>
         {/* 🏥 HEADER DINÁMICO */}
<View style={styles.headerRight}>
  <Text style={styles.nutriName}>
    {nutricionista.nombre} {nutricionista.apellido}
  </Text>
  <Text style={styles.nutriInfo}>
    Cédula: {nutricionista.cedula || '---'} | Tel: {nutricionista.telefono}
  </Text>
</View>
        </View>

        {/* 👤 CONTEXTO DEL PACIENTE */}
        <Text style={styles.sectionTitle}>Contexto del Paciente</Text>
        <View style={styles.patientCard}>
          <View><Text style={styles.label}>Paciente</Text><Text style={styles.value}>{paciente.nombre} {paciente.apellido}</Text></View>
          <View><Text style={styles.label}>Edad</Text><Text style={styles.value}>{data.biometricos?.edad || '--'} Años</Text></View>
          <View><Text style={styles.label}>Sexo</Text><Text style={styles.value}>{paciente.genero?.toUpperCase() || '--'}</Text></View>
          <View><Text style={styles.label}>Fecha</Text><Text style={styles.value}>{fechaHoy}</Text></View>
        </View>

        {/* 📊 REQUERIMIENTO (Si hay metas de dieta activas) */}
        {metas?.kcal > 0 && (
          <>
            <Text style={styles.sectionTitle}>Requerimiento y Distribución</Text>
            <View style={styles.requirementCard}>
              <View style={styles.calorieCircle}><Text style={styles.calorieNumber}>{metas.kcal}</Text></View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                <View><Text style={styles.label}>HCO</Text><Text style={styles.value}>{metas.macros?.hco}%</Text></View>
                <View><Text style={styles.label}>PROT</Text><Text style={styles.value}>{metas.macros?.pro}%</Text></View>
                <View><Text style={styles.label}>LIP</Text><Text style={styles.value}>{metas.macros?.lip}%</Text></View>
              </View>
            </View>
          </>
        )}

        {/* 🧪 SECCIÓN 1: METABÓLICO */}
        <Text style={styles.sectionTitle}>Perfil Metabólico y Renal</Text>
        <View style={styles.table}>
          <LabRow label="Glucosa en Ayuno" value={values.glucosa} unit="mg/dL" />
          <LabRow label="Urea" value={values.urea} unit="mg/dL" />
          <LabRow label="Creatinina" value={values.creatinina} unit="mg/dL" />
          <LabRow label="Ácido Úrico" value={values.acidoUrico} unit="mg/dL" />
        </View>

        {/* 🧪 SECCIÓN 2: CARDIOVASCULAR */}
        <Text style={styles.sectionTitle}>Salud Cardiovascular</Text>
        <View style={styles.table}>
          <LabRow label="Colesterol Total" value={values.colesterolTotal} unit="mg/dL" />
          <LabRow label="HDL (Bueno)" value={values.hdl} unit="mg/dL" />
          <LabRow label="LDL (Malo)" value={values.ldl} unit="mg/dL" />
          <LabRow label="Triglicéridos" value={values.trigliceridos} unit="mg/dL" />
        </View>

        {/* 🧪 SECCIÓN 3: NUTRICIONAL */}
        <Text style={styles.sectionTitle}>Perfil Nutricional</Text>
        <View style={styles.table}>
          <LabRow label="Hemoglobina" value={values.hemoglobina} unit="g/dL" />
          <LabRow label="Albúmina" value={values.albumina} unit="g/dL" />
          <LabRow label="Hierro Sérico" value={values.hierro} unit="µg/dL" />
        </View>

        {/* 🧪 SECCIÓN 4: URINARIO */}
        <Text style={styles.sectionTitle}>Examen de Orina (EGO)</Text>
        <View style={styles.table}>
          <LabRow label="Densidad" value={values.densidad} />
          <LabRow label="pH" value={values.ph} />
          <LabRow label="Aspecto" value={values.aspecto} />
        </View>

       {/* 🦶 FOOTER ACTUALIZADO Y DINÁMICO */}
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