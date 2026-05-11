import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Mail, MessageCircle, ShieldCheck, Info } from 'lucide-react-native';
import { COLORS, FONTS, FONT_SIZES, SPACING, RADIUS, SHADOW } from '../../Constants/theme';
import { useNavigation } from '@react-navigation/native';

const HelpCenterScreen = () => {
  const navigation = useNavigation();

  const handleEmailSupport = () => {
    Linking.openURL('mailto:support@unimart.com');
  };

  const HelpCard = ({ icon: Icon, title, description, onPress }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: COLORS.PRIMARY_LIGHT }]}>
        <Icon size={24} color={COLORS.PRIMARY_DARK1} />
      </View>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={24} color={COLORS.PRIMARY_DARK1} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>How can we help you?</Text>
          <Text style={styles.heroSubtitle}>
            Welcome to UniMart Help Center. We're here to ensure your campus trading experience is smooth and secure.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Contact Us</Text>
          <HelpCard 
            icon={Mail}
            title="Email Support"
            description="Get help within 24 hours at support@unimart.com"
            onPress={handleEmailSupport}
          />
          <HelpCard 
            icon={MessageCircle}
            title="Community Chat"
            description="Join our student community for quick tips"
            onPress={() => {}}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>About UniMart</Text>
          <View style={styles.aboutContent}>
            <View style={styles.aboutItem}>
              <Info size={20} color={COLORS.PRIMARY_DARK1} style={styles.aboutIcon} />
              <Text style={styles.aboutText}>
                UniMart is a dedicated marketplace designed exclusively for university students to buy, sell, and trade items safely within their campus community.
              </Text>
            </View>
            <View style={styles.aboutItem}>
              <ShieldCheck size={20} color={COLORS.SUCCESS} style={styles.aboutIcon} />
              <Text style={styles.aboutText}>
                Our mission is to promote sustainability and affordability by facilitating the reuse of textbooks, electronics, and other student essentials.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>UniMart v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for students</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HelpCenterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.BACKGROUND,
  },
  backButton: {
    padding: 8,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.BACKGROUND_LIGHT,
  },
  headerTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.lg,
    color: COLORS.PRIMARY_DARK1,
  },
  scrollContent: {
    padding: SPACING.lg,
  },
  heroSection: {
    marginBottom: SPACING.xl,
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTitle: {
    fontFamily: FONTS.EXTRABOLD,
    fontSize: FONT_SIZES.xxl,
    color: COLORS.PRIMARY_DARK1,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionLabel: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_MUTED,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.md,
    marginLeft: 4,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    ...SHADOW.card,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: FONTS.BOLD,
    fontSize: FONT_SIZES.md,
    color: COLORS.TEXT_PRIMARY,
    marginBottom: 2,
  },
  cardDescription: {
    fontFamily: FONTS.REGULAR,
    fontSize: FONT_SIZES.xs + 1,
    color: COLORS.TEXT_SECONDARY,
  },
  aboutContent: {
    backgroundColor: COLORS.BACKGROUND,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...SHADOW.card,
  },
  aboutItem: {
    flexDirection: 'row',
    marginBottom: SPACING.md,
  },
  aboutIcon: {
    marginRight: SPACING.md,
    marginTop: 2,
  },
  aboutText: {
    flex: 1,
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.sm,
    color: COLORS.TEXT_PRIMARY,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.xxl,
  },
  footerText: {
    fontFamily: FONTS.MEDIUM,
    fontSize: FONT_SIZES.xs,
    color: COLORS.TEXT_MUTED,
    marginBottom: 4,
  },
});
