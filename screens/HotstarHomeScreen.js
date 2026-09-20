import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  bg: '#0B0E1A',
  surface: '#151A2D',
  surfaceAlt: '#1E2438',
  accent: '#1F80E0',
  text: '#FFFFFF',
  subtext: '#A3ACC4',
  muted: '#6B7490',
  border: '#232A40',
  live: '#E03A3A',
};

const LOGO_SOURCE = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6evpfEIk5bFnyZdQmp7giQ_fzGgrulFZ3-w0hRL4RCJst3-cSfSLEl8o&s=10',
};

const TOP_TABS = ['For You', 'TV', 'Movies', 'Sports', 'Kids'];

const HERO = [
  {
    id: 'h1',
    title: 'The Last Frontier',
    meta: '2026 · Action Thriller · U/A 16+',
    tags: ['Action', 'Thriller', 'Hindi'],
    badge: 'NEW SERIES',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQXRyfih7Nr_IrAOvAF1E1Ye5FGL81pn_swmT9s-SsOg&s=10',
  },
  {
    id: 'h2',
    title: 'Dhurandhar The Revenge',
    meta: 'Live · Cricket · Match 34',
    tags: ['Live', 'Cricket'],
    badge: 'LIVE NOW',
    isLive: true,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1oYuW2e57lDa6g-nG0T9Kbg6aMlURB-iTejnlqQAZ2A&s=10',
  },
 
];

const ROWS = [
  {
    id: 'r1',
    title: 'Continue Watching',
    wide: true,
    items: [
      { id: 'c1', title: 'City of Echoes', sub: 'S2 E4', progress: 0.62, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPQ8P-LSoO6zLjCRPaEL_4gNIvgzubwoIczDEZSvzrQ&s=10' },
      { id: 'c2', title: 'The Last Frontier', sub: 'E2', progress: 0.28, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJbQntqNP7SKXTqSeBQt9OKHK9RU_2OarhI9BSGFDBA&s' },
      { id: 'c3', title: 'Night Shift', sub: 'S1 E9', progress: 0.85, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVx0muasMfe_b-1kS5FMXRXeJ_4hDJjfC0Q2frlfgjRw&s' },
    ],
  },
  {
    id: 'r2',
    title: 'Trending Now',
    items: [
      { id: 't1', title: 'Dhurandhar The Revenge', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1oYuW2e57lDa6g-nG0T9Kbg6aMlURB-iTejnlqQAZ2A&s=10' },
      { id: 't2', title: 'Mission Impossible', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB5MZzpTGhw2fyNCpzjeS0noExEwMjj5_fKOSLNqA43w&s=10' },
      { id: 't3', title: 'Saiyaara', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTvo1hf4bSlhF8VCljFAUbNjLP2-3ERVk2EYDUChXl0A&s=10' },
      { id: 't4', title: 'Inception', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjrWIVo22Mxzct7bDI6I4FIMbaoEAx0bTEPohrHte-kQ&s=10' },
    ],
  },
  {
    id: 'r3',
    title: 'Live Sports',
    wide: true,
    items: [
      { id: 's1', title: 'Match 34 · Quarter Final', sub: 'Starts 7:30 PM', live: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRo4YtCU4aD2CXYcPgsQdVRYmnx2-EsfpNGkRJErriJQ&s=10' },
      { id: 's2', title: 'ICC Cricket World Cup', sub: 'Live', live: true, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuXv6dx8BJGxjGKheWUk8-VLCeBiWesEG4_GVF_bW2g&s=10' },
      { id: 's3', title: 'Kabaddi Super Series', sub: 'Tomorrow, 8 PM', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMyLbdWGbevtpspVzcteASZx_OTihyaVwWnbE5tEZ2_g&s=10' },
    ],
  },
  {
    id: 'r4',
    title: 'Blockbuster Movies',
    items: [
      { id: 'm1', title: 'Mission Impossible', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB5MZzpTGhw2fyNCpzjeS0noExEwMjj5_fKOSLNqA43w&s=10' },
      { id: 'm2', title: 'Saiyaara', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTvo1hf4bSlhF8VCljFAUbNjLP2-3ERVk2EYDUChXl0A&s=10' },
      { id: 'm3', title: 'Dhurandhar The Revenge', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1oYuW2e57lDa6g-nG0T9Kbg6aMlURB-iTejnlqQAZ2A&s=10' },
      { id: 'm4', title: 'The Last Frontier', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLJbQntqNP7SKXTqSeBQt9OKHK9RU_2OarhI9BSGFDBA&s' },
    ],
  },
  
];

function TopBar() {
  const [active, setActive] = useState('For You');
  return (
    <View style={styles.topBarWrap}>
      <View style={styles.topBarRow}>
        <Text style={styles.logo}>
          Star<Text style={{ color: COLORS.accent }}>Stream</Text>
        </Text>
        <View style={styles.topBarIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Text style={styles.iconText}>⌕</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
      >
        {TOP_TABS.map((t) => {
          const on = t === active;
          return (
            <TouchableOpacity key={t} onPress={() => setActive(t)} style={styles.tabItem}>
              <Text style={[styles.tabText, on && styles.tabTextActive]}>{t}</Text>
              {on && <View style={styles.tabUnderline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const onScroll = (e) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };
  const hero = HERO[index];

  return (
    <View>
      <FlatList
        data={HERO}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <Image source={{ uri: item.image }} style={styles.heroImage} />
            <View style={styles.heroScrim} />
          </View>
        )}
      />

      <View style={styles.heroContent} pointerEvents="box-none">
        <View style={[styles.heroBadge, hero.isLive && styles.heroBadgeLive]}>
          {hero.isLive && <View style={styles.liveDot} />}
          <Text style={styles.heroBadgeText}>{hero.badge}</Text>
        </View>

        <Text style={styles.heroTitle}>{hero.title}</Text>
        <Text style={styles.heroMeta}>{hero.meta}</Text>

        <View style={styles.heroTagsRow}>
          {hero.tags.map((t, i) => (
            <View key={t} style={styles.heroTagWrap}>
              {i > 0 && <Text style={styles.heroTagDot}>•</Text>}
              <Text style={styles.heroTag}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={styles.heroBtnRow}>
          <TouchableOpacity style={styles.watchBtn} activeOpacity={0.85}>
            <Text style={styles.watchBtnText}>▶  {hero.isLive ? 'Watch Live' : 'Watch Now'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.listBtn} activeOpacity={0.85}>
            <Text style={styles.listBtnText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dotsRow}>
          {HERO.map((h, i) => (
            <View key={h.id} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
      </View>
    </View>
  );
}

function PosterCard({ item }) {
  return (
    <TouchableOpacity style={styles.posterCard} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.posterImage} />
      <Text style={styles.posterTitle} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  );
}

function WideCard({ item }) {
  return (
    <TouchableOpacity style={styles.wideCard} activeOpacity={0.85}>
      <View>
        <Image source={{ uri: item.image }} style={styles.wideImage} />
        {item.live && (
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveTagText}>LIVE</Text>
          </View>
        )}
        {item.progress !== undefined && (
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
          </View>
        )}
      </View>
      <Text style={styles.wideTitle} numberOfLines={1}>{item.title}</Text>
      {!!item.sub && <Text style={styles.wideSub} numberOfLines={1}>{item.sub}</Text>}
    </TouchableOpacity>
  );
}

function ChannelCard({ item }) {
  return (
    <TouchableOpacity style={styles.channelCard} activeOpacity={0.85}>
      <Image source={{ uri: item.image }} style={styles.channelImage} />
      <Text style={styles.channelTitle} numberOfLines={1}>{item.title}</Text>
    </TouchableOpacity>
  );
}

function ContentRow({ row }) {
  return (
    <View style={styles.rowWrap}>
      <View style={styles.rowHeader}>
        <Text style={styles.rowTitle}>{row.title}</Text>
        <TouchableOpacity>
          <Text style={styles.rowMore}>See all ›</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={row.items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
        renderItem={({ item }) =>
          row.channels ? <ChannelCard item={item} /> : row.wide ? <WideCard item={item} /> : <PosterCard item={item} />
        }
      />
    </View>
  );
}

function BottomNav() {
  const tabs = [
    { key: 'home', label: 'Home', icon: '⌂' },
    { key: 'sports', label: 'Sports', icon: '⚽' },
    { key: 'search', label: 'Search', icon: '⌕' },
    { key: 'downloads', label: 'Downloads', icon: '⬇' },
    { key: 'mystuff', label: 'My Space', icon: '☺' },
  ];
  const [active, setActive] = useState('home');
  return (
    <View style={styles.bottomNav}>
      {tabs.map((t) => {
        const on = t.key === active;
        return (
          <TouchableOpacity key={t.key} style={styles.navItem} onPress={() => setActive(t.key)} activeOpacity={0.7}>
            <Text style={[styles.navIcon, on && styles.navIconActive]}>{t.icon}</Text>
            <Text style={[styles.navLabel, on && styles.navLabelActive]}>{t.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function HotstarHomeScreen() {
  const showFullScreenBackground = true;

  if (showFullScreenBackground) {
    return (
      <View style={styles.fullScreenContainer}>
        <Image source={LOGO_SOURCE} style={styles.fullScreenImage} resizeMode="cover" />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <TopBar />
        <HeroCarousel />
        <View style={{ height: 10 }} />
        {ROWS.map((row) => (
          <ContentRow key={row.id} row={row} />
        ))}
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: COLORS.bg },
  fullScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(11, 14, 26, 0.5)',
  },

  topBarWrap: { paddingTop: 8, backgroundColor: COLORS.bg },
  topBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  logo: { color: COLORS.text, fontSize: 20, fontWeight: '900', letterSpacing: 0.3 },
  topBarIcons: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconBtn: { padding: 4 },
  iconText: { color: COLORS.text, fontSize: 20 },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: '#fff', fontSize: 13, fontWeight: '800' },

  tabsRow: { paddingHorizontal: 16, gap: 20, marginTop: 14 },
  tabItem: { alignItems: 'center', paddingBottom: 8 },
  tabText: { color: COLORS.subtext, fontSize: 13.5, fontWeight: '600' },
  tabTextActive: { color: COLORS.text, fontWeight: '800' },
  tabUnderline: {
    height: 2.5,
    width: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    marginTop: 6,
  },

  heroImage: { width, height: 460, resizeMode: 'cover', backgroundColor: COLORS.surface },
  heroScrim: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: COLORS.bg,
    opacity: 0.55,
  },

  heroContent: { marginTop: -150, paddingHorizontal: 16 },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 5,
  },
  heroBadgeLive: { backgroundColor: COLORS.live },
  heroBadgeText: { color: '#fff', fontSize: 9.5, fontWeight: '900', letterSpacing: 0.6 },
  liveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff' },

  heroTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '900',
    marginTop: 10,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroMeta: { color: COLORS.subtext, fontSize: 12.5, marginTop: 6 },
  heroTagsRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  heroTagWrap: { flexDirection: 'row', alignItems: 'center' },
  heroTagDot: { color: COLORS.muted, fontSize: 11, marginHorizontal: 6 },
  heroTag: { color: COLORS.subtext, fontSize: 11.5 },

  heroBtnRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16 },
  watchBtn: {
    flex: 1,
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  watchBtnText: { color: '#fff', fontSize: 14.5, fontWeight: '800' },
  listBtn: {
    width: 46,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  listBtnText: { color: COLORS.text, fontSize: 22, fontWeight: '700', marginTop: -2 },

  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 14 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.border },
  dotActive: { backgroundColor: COLORS.accent, width: 18 },

  rowWrap: { marginTop: 22 },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  rowTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800' },
  rowMore: { color: COLORS.subtext, fontSize: 12, fontWeight: '600' },

  posterCard: { width: 112 },
  posterImage: { width: 112, height: 164, borderRadius: 8, backgroundColor: COLORS.surface },
  posterTitle: { color: COLORS.subtext, fontSize: 11.5, marginTop: 7 },

  wideCard: { width: 210 },
  wideImage: { width: 210, height: 120, borderRadius: 8, backgroundColor: COLORS.surface },
  wideTitle: { color: COLORS.text, fontSize: 12.5, fontWeight: '700', marginTop: 8 },
  wideSub: { color: COLORS.muted, fontSize: 11, marginTop: 2 },
  progressTrack: {
    position: 'absolute',
    bottom: 6,
    left: 8,
    right: 8,
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: { height: 3, backgroundColor: COLORS.accent },
  liveTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.live,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  liveTagText: { color: '#fff', fontSize: 8.5, fontWeight: '900', letterSpacing: 0.5 },

  channelCard: { width: 78, alignItems: 'center' },
  channelImage: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  channelTitle: { color: COLORS.subtext, fontSize: 10.5, marginTop: 7, textAlign: 'center' },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 8,
    paddingBottom: 12,
  },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 17, color: COLORS.muted },
  navIconActive: { color: COLORS.accent },
  navLabel: { fontSize: 9.5, color: COLORS.muted, marginTop: 4 },
  navLabelActive: { color: COLORS.accent, fontWeight: '700' },
});
