import pandas as pd
import matplotlib.pyplot as plt

# Функция для создания графика
def plot_study_results(data_file):
    data = pd.read_csv(data_file)
    studies = data['study_name']
    effect_sizes = data['effect_size']

    plt.figure(figsize=(10, 6))
    plt.barh(studies, effect_sizes, color='skyblue')
    plt.xlabel('Effect Size')
    plt.ylabel('Study Name')
    plt.title('Effect Sizes by Study')
    plt.tight_layout()
    plt.savefig('assets/images/effect_sizes.png')
    plt.show()

if __name__ == "__main__":
    plot_study_results("data/meta_analysis/study_data.csv")
