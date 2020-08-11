import React, {useState} from "react"
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  Linking,
  Alert,
} from "react-native"
import {Node, Status} from "model"
import {Row} from "./Row.component"
import {Images} from "Assets"
import {Spacer} from "./Spacer.component"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {useStore} from "Root.store"
import {observer} from "mobx-react"

interface IProps {
  node: Node
}

function getTextStyle(hovered: boolean) {
  let baseStyle: any = {
    width: `80%`,
    flexWrap: `wrap`,
    fontSize: 14,
  }

  if (hovered) {
    // baseStyle.color = global.colors.blue500
    baseStyle.fontWeight = `bold`
  }

  return baseStyle
}

function getTintColorForState(status: Status) {
  switch (status) {
    case Status.passed:
      return `#27CA42`
    case Status.failed:
      return `#FC4943`
    case Status.pending:
      return {dynamic: {light: `#37474F`, dark: `#DDD`}}
    case Status.running:
      return `#FFBE30`
  }
}

export const NodeRow = observer(({node}: IProps) => {
  let store = useStore()
  let icon = Images[`${node.source.toLowerCase()}`]
  let [hovered, setHovered] = useState(false)

  let showQuickActions = hovered || Platform.OS !== `macos`

  function openUrl() {
    Linking.openURL(node.url)
  }

  async function triggerRebuild() {
    try {
      store.nodeStore.triggerRebuild(node)
    } catch (e) {
      Alert.alert(`Could not trigger rebuild`)
    }
  }

  let iconStyle =
    node.status === Status.pending ? styles.rowIconPending : styles.rowIcon

  return (
    <TouchableOpacity
      // @ts-ignore
      enableFocusRing={false}
      // @ts-ignore
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onPress={openUrl}>
      <Row vertical="center" style={styles.row}>
        {/* @ts-ignore */}
        <Image
          source={icon}
          style={[iconStyle, {tintColor: getTintColorForState(node.status)}]}
        />
        <Text style={getTextStyle(hovered)}>{node.label}</Text>
        <Spacer />
        {/* {showQuickActions && (
          <TouchableOpacity
            onPress={() => root.nodeStore.addIgnoredRegex(node.label)}>
            <Icon name="eye" size={18} />
          </TouchableOpacity>
        )} */}
        {showQuickActions && !!node.buildUrl && (
          <TouchableOpacity onPress={triggerRebuild}>
            <Icon name="refresh" style={styles.quickAction} />
          </TouchableOpacity>
        )}
      </Row>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  row: {
    paddingVertical: global.metrics.ps,
    paddingHorizontal: global.metrics.ps,
  },
  rowIcon: {
    height: global.metrics.imgSmall,
    width: global.metrics.imgSmall,
    resizeMode: `contain`,
    marginHorizontal: global.metrics.ps,
  },
  rowIconPending: {
    height: global.metrics.imgSmall,
    width: global.metrics.imgSmall,
    resizeMode: `contain`,
    marginHorizontal: global.metrics.ps,
    //@ts-ignore
    tintColor: {
      dynamic: {
        dark: `#EEE`,
        light: `#313232`,
      },
    },
  },
  quickAction: {
    fontSize: 15,
    //@ts-ignore
    color: {
      dynamic: {
        dark: `#EEE`,
        light: `#313232`,
      },
    },
  },
})
