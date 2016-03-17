Penetration.configure do
  preset(:information) { ->(message) { "<script>Notifier.information('#{message}')</script>" } }
  preset(:notify) { ->(message) { "<script>Notifier.notify('#{message}')</script>" } }
  preset(:alert) { ->(message) { "<script>Notifier.alert('#{message}')</script>" } }
end