//Author: Oscar Franco, created on: 23.05.20

import Foundation
import Cocoa

@NSApplicationMain
class AppDelegate: NSObject, NSApplicationDelegate {
  var popover: NSPopover!
  var bridge: RCTBridge!
  var statusBarItem: NSStatusItem!

  func applicationDidFinishLaunching(_ aNotification: Notification) {
    let jsCodeLocation: URL

    #if DEBUG
      jsCodeLocation = RCTBundleURLProvider.sharedSettings().jsBundleURL(forBundleRoot: "index", fallbackResource:nil)
    #else
      jsCodeLocation = Bundle.main.url(forResource: "main", withExtension: "jsbundle")!
    #endif
    
    let rootView = RCTRootView(bundleURL: jsCodeLocation, moduleName: "tempomat", initialProperties: nil, launchOptions: nil)
    let rootViewController = NSViewController()
    rootViewController.view = rootView

    popover = NSPopover()

    var screenHeight = CGFloat(800)
    if(NSScreen.main != nil) {
      screenHeight = NSScreen.main!.frame.height
    }

    let windowHeight = screenHeight / 1.5

    popover.contentSize = NSSize(width: 700, height: Int(windowHeight))
    popover.animates = true
    popover.behavior = .transient
    popover.contentViewController = rootViewController

    statusBarItem = NSStatusBar.system.statusItem(withLength: CGFloat(NSStatusItem.variableLength))

    if let button = self.statusBarItem.button {
      button.imagePosition = NSControl.ImagePosition.imageLeft
      button.image = NSImage(named: "initial")
      button.action = #selector(togglePopover(_:))
    }
  }

  @objc func togglePopover(_ sender: AnyObject?) {
      if let button = self.statusBarItem.button {
          if self.popover.isShown {
              self.popover.performClose(sender)
          } else {
              self.popover.show(relativeTo: button.bounds, of: button, preferredEdge: NSRectEdge.minY)

              self.popover.contentViewController?.view.window?.becomeKey()
          }
      }
  }

  func setStatusText(failed: NSInteger, running: NSInteger, passed: NSInteger) {
    var statuses: [String] = []
    if(running > 0) {
      statuses.append("pending")
    }
    if(failed > 0) {
      statuses.append("failed")
    }
    if(passed > 0) {
      statuses.append("passed")
    }

    if let button = self.statusBarItem.button {
      if(statuses.count > 0) {
        button.image = NSImage(named: statuses.joined(separator: "_"))
      } else {
        button.image = NSImage(named: "initial")
      }
    }
  }

  func closeApp() {
    NSApp.terminate(nil)
  }
}
