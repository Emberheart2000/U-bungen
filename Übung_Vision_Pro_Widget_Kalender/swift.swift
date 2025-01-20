import SwiftUI

struct CalendarView: View {
    var body: some View {
        HStack {
            // Calendar Section
            VStack(spacing: 0) {
                Text("DEZ")
                    .font(.largeTitle)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color.red)
                
                LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 7)) {
                    // Days of the week
                    ForEach(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"], id: \.self) { day in
                        Text(day)
                            .font(.headline)
                            .frame(maxWidth: .infinity)
                    }
                    
                    // Days of the month
                    ForEach(25...31, id: \.self) { day in
                        Text("\(day)")
                            .font(.body)
                            .frame(maxWidth: .infinity)
                            .padding(8)
                            .background(day == 28 ? Color.red : Color.clear)
                            .cornerRadius(15)
                            .foregroundColor(day == 28 ? .white : .black)
                    }
                }
                .padding()
                .background(Color.white)
                .cornerRadius(10)
            }
            .frame(width: UIScreen.main.bounds.width / 2)
            
            // Events Section
            VStack(alignment: .leading, spacing: 10) {
                EventView(title: "Invention Meeting", time: "10:00 - 13:00", color: .gray)
                EventView(title: "Mittagspause", time: "13:00 - 13:30", color: .blue)
                EventView(title: "Invention Meeting", time: "13:30 - 16:00", color: .gray)
            }
            .frame(width: UIScreen.main.bounds.width / 2)
            .padding()
        }
        .background(Color(.systemGray6))
        .edgesIgnoringSafeArea(.all)
    }
}

struct EventView: View {
    let title: String
    let time: String
    let color: Color
    
    var body: some View {
        HStack {
            VStack(alignment: .leading) {
                Text(title)
                    .font(.headline)
                    .foregroundColor(.white)
                Text(time)
                    .font(.subheadline)
                    .foregroundColor(.white.opacity(0.7))
            }
            Spacer()
        }
        .padding()
        .background(color)
        .cornerRadius(10)
    }
}

struct CalendarView_Previews: PreviewProvider {
    static var previews: some View {
        CalendarView()
    }
}